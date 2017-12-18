import Order from 'models/order';

describe('Order spec', () => {
  describe('Order validations', () => {
    let order;
    beforeEach(() => {
      order = new Order({
        symbol: 'HUMOR',
        targetPrice: '78.70',
        currentPrice: '88.50',
        buy: true,
      });
    });

    it('returns false if order is valid', () => {

      expect(order.validate(order.attributes)).toEqual(false);
    });

    it('requires a symbol to be valid', () => {
      order.set('symbol', '');

      expect(order.isValid()).toBeFalsy();
    });

    it('requires a targetPrice to be valid', () => {
      order.set('targetPrice', '');

      expect(order.isValid()).toBeFalsy();
    });

    it('is invalid if the buy price is higher than the current price', () =>{
      order.set('targetPrice', '92');

      expect(order.isValid()).toBeFalsy();
    });

    it('is invalid if the sell price is lower than the current price', () => {
      order.set('buy', false);

      expect(order.isValid()).toBeFalsy();
    });

    it('is invalid if the target price is 0 or not a number', () => {
      order.set('targetPrice', '0');

      expect(order.isValid()).toBeFalsy();

      order.set('targetPrice', 'pfue');

      expect(order.isValid()).toBeFalsy();
    });
  });
});
