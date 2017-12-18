// import Order from '../src/models/order';
import Order from 'models/order';

describe('Order spec', () => {

  describe('Initialize function', () => {
    it('should exhibit attibutes', () => {
      const order = new Order({
        targetPrice: 88.60,
        buy: true,
        symbol: 'HUMOR',
      });

      expect(order.get('targetPrice'))
        .toEqual(88.60);
      expect(order.get('buy'))
        .toEqual(true);
      expect(order.get('symbol'))
        .toEqual('HUMOR');
    });
  });

  describe('Validate function', () => {
    it('should set isValid() to false and return an object with correct message if missing targetPrice', () => {
      const order = new Order({
          // targetPrice: 88.60,
          buy: true,
          symbol: 'HUMOR',
        });

      // order.set({"targetPrice": '0'});
      expect(order.isValid()).toBeFalsy();
      expect(order.validationError).toEqual({'price': ['A price is required']})
    });

    it('should set isValid() to false and return an object with correct message if missing symbol', () => {
      const order = new Order({
          targetPrice: 88.60,
          buy: true,
          // symbol: 'HUMOR',
        });

      expect(order.isValid()).toBeFalsy();
      expect(order.validationError).toEqual({'symbol': ['A symbol is required']})
    });

  });
});

// Write a test which verifies that limit orders are executed and destroyed when the relevant stock reaches the order's target price.
