import Order from 'models/order';

describe('Order spec', () => {

  describe('Initialize', () => {
    it('Can access all instance variables.', () => {
      const order = new Order({
        currentQuote: 'HELLO',
        currentPrice:  100.00,
        buy:  true,
        targetPrice:  101.00
      });

      expect(order.get('currentQuote')).toEqual('HELLO');
      expect(order.get('currentPrice')).toEqual(100.00);
      expect(order.get('buy')).toEqual(true);
      expect(order.get('targetPrice')).toEqual(101.00);
    });
  });

  describe('Creates a new Order.', () => {

    it('Creates a valid instance of Order', () => {
      const order = new Order({
        currentQuote: 'HELLO',
        currentPrice:  100.00,
        buy:  true,
        targetPrice: 50.00,
      });

      expect(order.isValid()).toEqual(true);
    });

    it ('Rejects an empty price.', () => {
      const order = new Order({
        symbol: 'HELLO',
        currentPrice: '',
        action: true,
      });

      expect(order.isValid()).toEqual(false);
    });

    it('Can not create an order with target price greater than or equal to the current price when buying.', () => {
      const order = new Order({
        currentQuote: 'HELLO',
        currentPrice:  100.00,
        buy:  true,
        targetPrice: 101.00,
      });

      expect(order.isValid()).toEqual(false);
    });

    it('Can not create an order with target price less than or equal to the current price when selling.', () => {
      const order = new Order({
        currentQuote: 'HELLO',
        currentPrice:  100.00,
        buy:  false,
        targetPrice: 99.00,
      });

      expect(order.isValid()).toEqual(false);
    });

  });
});
