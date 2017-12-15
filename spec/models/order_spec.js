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
    it('returns an object with correct message if missing targetPrice', () => {
      const order = new Order({
          targetPrice: 88.60,
          buy: true,
          symbol: 'HUMOR',
        });

      // expect(order).toThrow(new Error('model is required'));

      order.set({"targetPrice": '0'});

      expect(order.isValid()).toBeFalsy();
    });
  });
});
