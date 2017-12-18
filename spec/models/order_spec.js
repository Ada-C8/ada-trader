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
});
