import Order from 'models/order';

describe('Order spec', () => {
  let order;
  // beforeEach(() => {
  //   order = new Order({
  //     symbol: 'HELLO',
  //   });
  // });

  describe('targetPrice is required', () => {
    it('is invalid if no targetPrice', () => {
      order = new Order({
        symbol: 'HELLO',
      })

      expect(order.isValid()).toBeFalsy();
    });
    it('is valid if there is a targetPrice', () => {
      order = new Order({
        symbol: 'HELLO',
        targetPrice: 100.00
      })

      expect(order.isValid()).toBeTruthy();
    });
  });

});
