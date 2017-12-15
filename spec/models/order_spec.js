import Order from 'models/order';

describe('Order spec', () => {

  describe('Initialize', () => {
    it('has access to all instance variables', () => {
      const order = new Order({
        currentQuote: 'HELLO',
        currentPrice:  100.00,
        buy:  true,
        targetPrice:  102.00
      });

      expect(order.get('currentQuote')).toEqual('HELLO');
      expect(order.get('currentPrice')).toEqual(100.00);
      expect(order.get('buy')).toEqual(true);
      expect(order.get('targetPrice')).toEqual(102.00);
    });

  });

  describe('Validations', () => {
    it('can be created with all nessesery parameters', () => {
      const order = new Order({
        currentQuote: 'HELLO',
        currentPrice:  100.00,
        buy:  true,
        targetPrice: 20.00,
      });

      expect(order.isValid()).toBeTruthy();
    });

    it('cannot be created without targetPrice', () => {
      const order = new Order({
        currentQuote: 'HELLO',
        currentPrice:  100.00,
        buy:  true,
      });

      expect(order.isValid()).toBeFalsy();
    });

    it('cannot be created with target price being greater than or equal to the current market price when buying', () => {
      const order = new Order({
        currentQuote: 'HELLO',
        currentPrice:  100.00,
        buy:  true,
        targetPrice: 101.00,
      });

      expect(order.isValid()).toBeFalsy();
    });

    it('cannot be created with target price being less than or equal to the current market price when selling', () => {
      const order = new Order({
        currentQuote: 'HELLO',
        currentPrice:  100.00,
        buy:  false,
        targetPrice: 99.00,
      });

      expect(order.isValid()).toBeFalsy();
    });
  });
});
