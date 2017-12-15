import Order from 'models/order';

describe('Order spec', () => {
  describe('Order defaults', () => {
    it('is created with a symbol and a targetPrice', () => {
      const order = new Order();

      expect(order.get('targetPrice')).toEqual(0);
      expect(order.get('symbol')).toEqual('UNDEF');
    });
  });

  describe('Order Validations', () => {
    it('returns an error if a symbol is blank', () => {
      const order = new Order({
        symbol: '',
        targetPrice: 15.00,
        buy: true,
      });

      expect(order.isValid()).toBeFalsy();
      expect(order.validationError).toEqual({symbol: ["You must select a symbol!"]});
    });

    it('returns an error if a targetPrice is blank', () => {
      const order = new Order({
        symbol: 'HUMOR',
        targetPrice: '',
        buy: true,
      });

      expect(order.isValid()).toBeFalsy();
      expect(order.validationError).toEqual({targetPrice: ["Your target price cannot be blank!"]});
    });

    it('returns an error if a targetPrice is zero', () => {
      const order = new Order({
        symbol: 'HUMOR',
        targetPrice: 0,
        buy: true,
      });

      expect(order.isValid()).toBeFalsy();
      expect(order.validationError).toEqual({targetPrice: ["Please enter a number higher than 0!"]});
    });

    // it('returns an error if a targetPrice is a string', () => {
    //   const order = new Order({
    //     symbol: 'HUMOR',
    //     targetPrice: 'This is not a price!',
    //     buy: true,
    //   });
    //
    //   expect(order.isValid()).toBeFalsy();
    //   expect(order.validationError).toEqual({noString: ["Please enter an integer"]});
    // });
  }); // INNER DESCRIBE BLOCK
}); // OUTER DESCRIBE BLOCK
