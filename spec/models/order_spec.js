import Quote from 'models/quote';
import Order from 'models/order';

describe('Order spec', () => {
  let quote;
  beforeEach(() => {
    quote = new Quote({
      symbol: 'CLOTH',
      price: 100.00,
    });
  });

  describe('Create a new Order', () => {
    it('creates a valid instance of an Order', () => {
      const order = new Order({
        symbol: 'CLOTH',
        targetPrice: 80.00,
        buy: true,
        quote: quote,
      })

      expect(order.isValid()).toEqual(true);
    })

    it('invalid order if price is not a number', () => {
      const order = new Order({
        symbol: 'CLOTH',
        targetPrice: 'hello',
        buy: false,
        quote: quote,
      })

      expect(order.isValid()).toEqual(false);
    })

    it('invalid buy order if price is higher than market', () => {
      const order = new Order({
        symbol: 'CLOTH',
        targetPrice: 180.00,
        buy: true,
        quote: quote,
      })

      expect(order.isValid()).toEqual(false);
    })

    it('invalid sell order if price is lower than market', () => {
      const order = new Order({
        symbol: 'CLOTH',
        targetPrice: 8.00,
        buy: false,
        quote: quote,
      })

      expect(order.isValid()).toEqual(false);
    })
  });
});
