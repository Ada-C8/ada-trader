import Order from 'models/order';

describe('Order spec', () => {
  describe('Order defaults', () => {
    it('is created with a default symbol and price', () => {
      const order = new Order();

      expect(order.get('price')).toEqual(0);
      expect(order.get('symbol')).toEqual('UNDEF');
      expect(order.get('buy')).toEqual(false);
    });
  });

  describe('Order Validations', () => {
    it('returns no errors for valid submitted parameters', () => {
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
      expect(order.validationError).toEqual({symbol: "You must select a symbol!"});
    });

    it('returns an error if a price is blank', () => {
      const order = new Order({
        symbol: 'HUMOR',
        price: '',
        buy: true,
      });

      expect(order.isValid()).toBeFalsy();
      expect(order.validationError).toEqual({price: "Your target price cannot be blank!"});
    });

    it('returns an error if a price is zero', () => {
      const order = new Order({
        symbol: 'HUMOR',
        price: 0,
        buy: true,
      });

      expect(order.isValid()).toBeFalsy();
      expect(order.validationError).toEqual({price: "Please enter a number higher than 0!"});
    });

  }); // INNER DESCRIBE BLOCK
}); // OUTER DESCRIBE BLOCK
