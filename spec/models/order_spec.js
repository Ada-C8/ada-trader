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

  describe ('shouldTrade method', () => {
    it('returns "buy" if the trade should be bought', () => {
      let order = new Order({
        symbol: 'CLOTH',
        targetPrice: 120.00,
        buy: true,
        quote: quote,
      })

      expect(order.shouldTrade()).toEqual('buy');

      order = new Order({
        symbol: 'CLOTH',
        targetPrice: 100.00,
        buy: true,
        quote: quote,
      })

      expect(order.shouldTrade()).toEqual('buy');
    })

    it('returns "sell" if the trade should be sold', () => {
      let order = new Order({
        symbol: 'CLOTH',
        targetPrice: 90.00,
        buy: false,
        quote: quote,
      })

      expect(order.shouldTrade()).toEqual('sell');

      order = new Order({
        symbol: 'CLOTH',
        targetPrice: 100.00,
        buy: false,
        quote: quote,
      })

      expect(order.shouldTrade()).toEqual('sell');

    });

    it('returns false if no trade should be made', () => {
      let order = new Order({
        symbol: 'CLOTH',
        targetPrice: 110.00,
        buy: false,
        quote: quote,
      })

      expect(order.shouldTrade()).toEqual(false);

      order = new Order({
        symbol: 'CLOTH',
        targetPrice: 90.00,
        buy: true,
        quote: quote,
      })

      expect(order.shouldTrade()).toEqual(false);

    });
  });
});
