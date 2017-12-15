import Order from 'models/order';
import Quote from 'models/quote';
import QuoteList from 'collections/quote_list';

describe('Order spec', () => {
  let order;
  let quotes;
  let invalidOrder;
  let mktPrice = 100.00;

  beforeEach(() => {
    quotes = new QuoteList([
      {
        symbol: 'HELLO',
        price: mktPrice,
      },
      {
        symbol: 'HUMOR',
        price: 85.00,
      }
    ]);

    order = new Order({
      quotes: quotes,
      symbol: 'HELLO',
      buy: true,
      targetPrice: 90.00,
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


});
