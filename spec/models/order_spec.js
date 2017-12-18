import Order from 'models/order';
import Quote from 'models/quote';

describe('Order spec', () => {
  let order;
  beforeEach(() => {
    order = new Order({
      symbol: 'HELLO',
      price: 100.00,
    });
  });

  describe('validate', () => {
    it('validates there is a target price', () => {
      const prices = ['', NaN, undefined, 0]

      prices.forEach((price)=> {
        const order = new Order({
          targetPrice: price
        });

        expect(order.isValid()).toBeFalsy();
      });
    });


    it('buy price is not >= to the current market price', () => {
      const prices = [100, 1000];

      prices.forEach((price)=> {
        const order = new Order({
          targetPrice: price,
          buy: true,
        });

        expect(order.isValid()).toBeFalsy();
      });
    });


  });
});
