import Order from 'models/order';
import Quote from 'models/quote';
import QuoteList from 'collections/quote_list';

describe('Order spec', () => {
  let order;
  let quotes;
  let invalidOrder;

  beforeEach(() => {
    quotes = new QuoteList([
      {
        symbol: 'HELLO',
        price: 100.00,
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

      // testing null
      invalidOrder.set('symbol', null)

    });
  });

  describe('getCurrentPrice function', () => {
    it ('gets the current (market) price of the quote', () => {
      const mktPrice = quotes.findWhere({symbol: 'HELLO'}).get('price');

      expect(mktPrice).toEqual(100.00);
      expect(order.getCurrentPrice()).toEqual(mktPrice);
    });

    it('returns undefined if the quote does not exist', () => {
      expect(invalidOrder.getCurrentPrice()).toBeUndefined();
    });
  });


});
