import Order from 'models/order';

describe('Order spec', () => {
  describe('validate', () => {
    it('validates there is a price', () => {
      const prices = ['', NaN]
      prices.forEach((price)=> {
        const order = new Order({targetPrice: price});
        expect(order.isValid()).toBeFalsy();
      });
    });
    it('validates there buy price', () => {

    });
    it('validates there sell price', () => {

    });
  });

  describe('orderMe function', () => {

  });
});
