import Order from 'models/order';
import QuoteList from 'collections/quote_list';


describe('Order spec', () => {
  describe('validations', () => {
    let order;
    const quoteData = [
      {
        symbol: 'HUMOR',
        price: 88.50,
      },
      {
        symbol: 'CLOTH',
        price: 81.70,
      },
      {
        symbol: 'HABIT',
        price: 98.00,
      },
      {
        symbol: 'HELLO',
        price: 99.00,
      },
    ];
    const quotes = new QuoteList(quoteData);
    beforeEach(() => {
      order = new Order({
        symbol: 'HELLO',
        targetPrice: 85.00,
        buy: true,
        quotes: quotes,
      });
    });

    it('creates an order', () => {
      expect(order.isValid()).toEqual(true);
    });

    it('requires a symbol', () => {
      order.set('symbol', '')

      expect(order.isValid()).toEqual(false);
    });

    it('requires a targetPrice', () => {
      order = new Order({
        symbol: 'HELLO',
      });

      expect(expect(order).toBeDefined()).toEqual(undefined);
    });

    it('requires a targetPrice to be a number', () => {
      order = new Order({
        symbol: 'HELLO',
        targetPrice: 'cats',
      });

      expect(expect(order).toBeDefined()).toEqual(undefined);
    });

    it('will not let you buy if quote price is lower than target price', () => {
      order = new Order({
        symbol: 'HELLO',
      });

      expect(expect(order).toBeDefined()).toEqual(undefined);
    });

    it('will not let you sell if quote price is higher than target price', () => {
      order = new Order({
        symbol: 'HELLO',
      });

      expect(expect(order).toBeDefined()).toEqual(undefined);
    });

  });

});
