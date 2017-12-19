import Quote from 'models/quote';
import Order from 'models/order';

describe('Order spec', () => {
  let quote;
  let order;
  beforeEach(() => {
    quote = new Quote({
      symbol: 'CLOTH',
      price: 100.00,
    });
    order = new Order({
      symbol: 'CLOTH',
      quote: quote,
      buy: true,
      targetPrice: 100,
    })
  });

  describe('Create a new Order', () => {
    it('creates a valid instance of an Order', () => {
      order.set('targetPrice', 80.00);
      order.set('buy', true);

      expect(order.isValid()).toEqual(true);
    })

    it('invalid order if price is not a number', () => {
      order.set('targetPrice', 'hello');

      expect(order.isValid()).toEqual(false);
    })

    it('invalid buy order if price is higher than market', () => {
      order.set('targetPrice', 180);
      order.set('buy', true);

      expect(order.isValid()).toEqual(false);
    })

    it('invalid sell order if price is lower than market', () => {
      order.set('targetPrice', 8);
      order.set('buy', false);

      expect(order.isValid()).toEqual(false);
    })
  });

  describe ('shouldTrade method', () => {
    it('returns "buy" if the trade should be bought', () => {

      order.set('buy', true);
      order.set('targetPrice', 120);

      expect(order.shouldTrade()).toEqual('buy');

      order.set('targetPrice', 100);

      expect(order.shouldTrade()).toEqual('buy');
    })

    it('returns "sell" if the trade should be sold', () => {

      order.set('buy', false);
      order.set('targetPrice', 90);

      expect(order.shouldTrade()).toEqual('sell');

      order.set('targetPrice', 100);

      expect(order.shouldTrade()).toEqual('sell');

    });

    it('returns false if no trade should be made', () => {

      order.set('buy', false);
      order.set('targetPrice', 110);

      expect(order.shouldTrade()).toEqual(false);

      order.set('buy', true);
      order.set('targetPrice', 90);

      expect(order.shouldTrade()).toEqual(false);

    });
  });
});
