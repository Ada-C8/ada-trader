import Order from 'models/order';

describe('Order spec', () => {
  describe('Order defaults', () => {
    it('is created with a symbol and a price', () => {
      const order = new Order();

      expect(order.get('price')).toEqual(0);
      expect(order.get('symbol')).toEqual('UNDEF');
    });
  });

  describe('Order Validations', () => {
    it('returns no errors valid order parameters', () => {
      const order = new Order({
        symbol: 'UNDEF',
        price: 15.00,
        buy: true,
      });

      expect(order.isValid()).toBeTruthy();
      expect(order.validationError).toBeNull();
    });

    it('returns an error if a symbol is blank', () => {
      const order = new Order({
        symbol: '',
        price: 15.00,
        buy: true,
      });

      expect(order.isValid()).toBeFalsy();
      expect(order.validationError).toEqual({symbol: ["You must select a symbol!"]});
    });

    it('returns an error if a price is blank', () => {
      const order = new Order({
        symbol: 'HUMOR',
        price: '',
        buy: true,
      });

      expect(order.isValid()).toBeFalsy();
      expect(order.validationError).toEqual({price: ["Your target price cannot be blank!"]});
    });

    it('returns an error if a price is zero', () => {
      const order = new Order({
        symbol: 'HUMOR',
        price: 0,
        buy: true,
      });

      expect(order.isValid()).toBeFalsy();
      expect(order.validationError).toEqual({price: ["Please enter a number higher than 0!"]});
    });

    // TODO: Do I need to test the initialize of attributes???
  }); // INNER DESCRIBE BLOCK
}); // OUTER DESCRIBE BLOCK
