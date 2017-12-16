import Order from 'models/order';
import QuoteList from 'collections/quote_list';


describe('Order spec', () => {
  describe('validations', () => {
    let order;
    const quotes = new QuoteList({
      symbol: 'HELLO',
      price: 99.00,
    });
    beforeEach(() => {
      order = new Order({
        symbol: 'HELLO',
        targetPrice: 85.00,
        buy: true,
        quotes: quotes,
      });
    });

    it('creates a valid order', () => {
      expect(order.isValid()).toEqual(true);
    });

    it('requires a symbol', () => {
      order.set('symbol', null)

      expect(order.isValid()).toEqual(false);

      order.set('symbol', '')

      expect(order.isValid()).toEqual(false);
    });

    it('requires a symbol that exists in the quote data', () => {
      order.set('symbol', 'SEEYA')

      expect(order.isValid()).toEqual(false);
    });

    it('requires a targetPrice', () => {
      order.set('targetPrice', '')

      expect(order.isValid()).toEqual(false);
    });

    it('requires a targetPrice to be a number', () => {
      order.set('targetPrice', 'cats')

      expect(order.isValid()).toEqual(false);
    });

    it('requires a targetPrice to be a number larger than 0', () => {
      order.set('targetPrice', 0.00)

      expect(order.isValid()).toEqual(false);
    });

    it('requires a targetPrice to be a positive number', () => {
      order.set('targetPrice', -4.00)

      expect(order.isValid()).toEqual(false);
    });

    it('will not let you create a new buy if quote price is lower than target price', () => {
      order.set('targetPrice', 120.00)

      expect(order.isValid()).toEqual(false);
    });

    it('will not let you create new sell if quote price is higher than target price', () => {
      order.set('buy', false)
      order.set('targetPrice', 40.00)

      expect(order.isValid()).toEqual(false);
    });
  });
});
