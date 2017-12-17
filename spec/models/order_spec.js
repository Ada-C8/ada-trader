import Order from 'models/order';

describe('Order spec', () => {
  let order;

  describe('Validations', () => {
    it('requires a targetPrice', () => {

      let order = new Order({
        symbol: 'HELLO',
        quotePrice: 10.00,
        // targetPrice: 1,
        buy: true,
      });

      expect(order.isValid()).toBeFalsy();
    });

    it('is valid with a targetPrice', () => {
      let order = new Order({
        buy: true,
        quotePrice: 88.1,
        symbol: "HUMOR",
        targetPrice: 1,
      });

      expect(order.isValid()).toBeTruthy();
    });
    // it('for a buy order the target price must be greater than the marketPrice', () => {
    //
    // });
    // it('for a sell order the targetPrice must be less than the current marketPrice', () => {
    //
    // });
  });
});
