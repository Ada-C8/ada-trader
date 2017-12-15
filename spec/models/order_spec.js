import Backbone from 'backbone';
import _ from 'underscore';

import Order from 'models/order';
import QuoteList from 'collections/quote_list';

describe('Order spec', () => {
  let order;
  let quotes;
  let invalidOrder;
  let mktPrice = 100.00;
  let bus;

  beforeEach(() => {
    bus = {};
    bus = _.extend(bus, Backbone.Events);

    quotes = new QuoteList([
      {
        symbol: 'CLOTH',
        price: mktPrice,
      },
      {
        symbol: 'HUMOR',
        price: 85.00,
      }
    ]);

    order = new Order({
      quotes: quotes,
      symbol: 'CLOTH',
      buy: true,
      targetPrice: 90.00,
      bus: bus,
    });

    invalidOrder = new Order({
      quotes: quotes,
      symbol: 'BAD',
      buy: false,
      targetPrice: 85.00,
    });
  });

  describe('Validations', () => {
    it('is invalid if the symbol is not in the quote list', () => {
      expect(invalidOrder.isValid()).toEqual(false);
      expect(order.isValid()).toEqual(true);
    });

    it('requires a symbol to be valid', () => {
      // testing undefined
      invalidOrder.set('symbol', undefined);

      expect(invalidOrder.get('symbol')).toBeUndefined();
      expect(invalidOrder.isValid()).toEqual(false);

      // testing empty string
      invalidOrder.set('symbol', '');

      expect(invalidOrder.get('symbol')).toEqual('');
      expect(invalidOrder.isValid()).toEqual(false);

      // testing null
      invalidOrder.set('symbol', null);

      expect(invalidOrder.get('symbol')).toBeNull();
      expect(invalidOrder.isValid()).toEqual(false);
    });

    it('requires a number to be valid', () => {
      const invalidPrices = [null, undefined, '', '  ', 'cat', '.', '-', '0.-'];

      invalidPrices.forEach((badPrice) => {
        invalidOrder.set('targetPrice', badPrice);
        // confirm changes made
        if (badPrice === null) {
          expect(invalidOrder.get('targetPrice')).toBeNull();
        } else if (badPrice === undefined) {
          expect(invalidOrder.get('targetPrice')).toBeUndefined();
        } else {
          expect(invalidOrder.get('targetPrice')).toEqual(badPrice);
        }

        expect(invalidOrder.isValid()).toEqual(false);
      });
    });

    it('requires a price greater than 0 to be valid', () => {
      const invalidPrice = -2.00;
      invalidOrder.set('targetPrice', invalidPrice);

      expect(invalidOrder.get('targetPrice')).toEqual(invalidPrice);
      expect(invalidOrder.isValid()).toEqual(false);
    });

    it('requires target price to be below market price if the order is to buy', () => {
      const badTargetPrice = mktPrice + 1;
      order.set('targetPrice', badTargetPrice);

      expect(order.get('targetPrice')).toEqual(badTargetPrice);
      expect(order.get('buy')).toEqual(true);
      expect(order.isValid()).toEqual(false);
    });

    it('will accept limit order with target price less than or equal to mkt price if purchasing', () => {
      const goodPrices = [mktPrice, mktPrice - 1];

      goodPrices.forEach((price) => {
        order.set('targetPrice', price);

        expect(order.get('targetPrice')).toEqual(price);
        expect(order.isValid()).toEqual(true);
      });
    });

    it('requires target price to exceed market price if the order is to sell', () => {
      const badTargetPrice = mktPrice - 1;
      order.set('targetPrice', badTargetPrice);
      order.set('buy', false);

      expect(order.get('targetPrice')).toEqual(badTargetPrice);
      expect(order.get('buy')).toEqual(false);
      expect(order.isValid()).toEqual(false);
    });

    it('will accept limit order with target price greater than or equal to mkt price if selling', () => {
      const goodPrices = [mktPrice, mktPrice + 1];

      goodPrices.forEach((price) => {
        order.set('targetPrice', price);
        order.set('buy', false);

        expect(order.get('targetPrice')).toEqual(price);
        expect(order.get('buy')).toEqual(false);
        expect(order.isValid()).toEqual(true);
      });
    });
  });

  describe('getCurrentPrice function', () => {
    it ('gets the current (market) price of the quote', () => {
      expect(order.getCurrentPrice()).toEqual(mktPrice);
    });

    it('returns undefined if the quote does not exist', () => {
      expect(invalidOrder.getCurrentPrice()).toBeUndefined();
    });
  });

  describe('checkPrice function', () => {
    let quote;
    let targetPrice;
    let mockQuoteView;
    let buyQuote;
    let sellQuote;

    beforeEach(() => {
      targetPrice = order.get('targetPrice');
      quote = quotes.findWhere({symbol: order.get('symbol')});

      mockQuoteView = {
        model: quote,
        bus: bus,
        buyQuote() {
          this.model.buy();
        },
        sellQuote() {
          this.model.sell();
        }
      };

      buyQuote = `buy${quote.get('symbol')}`;
      sellQuote = `sell${quote.get('symbol')}`;

      mockQuoteView = _.extend(mockQuoteView, Backbone.Events);

      mockQuoteView.listenTo(bus, buyQuote, mockQuoteView.buyQuote);
      mockQuoteView.listenTo(bus, sellQuote, mockQuoteView.sellQuote);

      spyOn(quote, 'buy');
      spyOn(quote, 'sell');
      spyOn(order, 'destroy');
      // spyOn(bus, 'trigger');
      // spyOn(bus, sellQuote);
    });

    it('triggers buy() on quote model if buying and market price == target price', () => {
      // confirm target price less than market price
      expect(targetPrice).toBeLessThan(mktPrice);

      // confirm no calls to event if market price hasn't reached target price
      order.checkPrice(quote);

      expect(quote.buy.calls.count()).toEqual(0);
      // expect(bus.trigger).toHaveBeenCalledWith(buyQuote);

      // trigger call when market price == target price
      quote.set('price', targetPrice);

      expect(quote.get('price')).toEqual(targetPrice);
      order.checkPrice(quote);

      expect(quote.buy.calls.count()).toEqual(1);
    });

    it('triggers buy() on quote model if buying and market price < target price', () => {
      expect(targetPrice).toBeLessThan(mktPrice);
      order.checkPrice(quote);

      expect(quote.buy.calls.count()).toEqual(0);
      quote.set('price', targetPrice - 1);

      expect(quote.get('price')).toEqual(targetPrice - 1);
      order.checkPrice(quote);

      expect(quote.buy.calls.count()).toEqual(1);
    });

    it('triggers sell() on quote model if selling and market price == target price', () => {
      // set up valid order to sell
      quote.set('price', targetPrice - 1);
      order.set('buy', false);

      expect(quote.get('price')).toEqual(targetPrice - 1);
      expect(order.get('buy')).toEqual(false);
      expect(quote.sell.calls.count()).toEqual(0);

      quote.set('price', targetPrice);

      expect(quote.get('price')).toEqual(targetPrice);

      order.checkPrice(quote);

      expect(quote.sell.calls.count()).toEqual(1);
    });

    it('triggers sell() on quote model if selling and market price > target price', () => {
      // set up valid order to sell
      quote.set('price', targetPrice - 1);
      order.set('buy', false);

      expect(quote.get('price')).toEqual(targetPrice - 1);
      expect(order.get('buy')).toEqual(false);
      expect(quote.sell.calls.count()).toEqual(0);

      quote.set('price', targetPrice + 1);

      expect(quote.get('price')).toEqual(targetPrice + 1);

      order.checkPrice(quote);

      expect(quote.sell.calls.count()).toEqual(1);
    });

    it('destroys itself (the order model) after executing', () => {
      quote.set('price', targetPrice);

      expect(order.destroy.calls.count()).toEqual(0);
      expect(quote.get('price')).toEqual(targetPrice);
      order.checkPrice(quote);

      expect(order.destroy.calls.count()).toEqual(1);
    });
  });
});
