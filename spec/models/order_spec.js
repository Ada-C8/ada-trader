import Order from 'models/order';

describe('Order spec', () => {
  let order;

  beforeEach(() => {
    order = new Order({
      symbol: 'HELLO',
      quotePrice: 10.00,
      targetPrice: 1,
      buy: true,
    });
  });

  describe('Validations', () => {
    it('is valid with correct data attributes', () => {
      expect(order.isValid()).toBeTruthy();
    });

    it('requires a targetPrice', () => {
      // order w/o a target price
      order.unset('targetPrice')
      expect(order.isValid()).toBeFalsy();
    });

    it('invalid if a buy orders targetPrice is greater than the quotePrice', () => {
      // increase the price
      const higherPrice = (order.get('quotePrice') + 1);
      order.set('targetPrice', higherPrice);
      expect(order.isValid()).toBeFalsy();
    });

    it('invalid if a sell orders targetPrice is less than the quotePrice', () => {
      // make it a sell order
      order.set('buy', false);
      // lower the price
      const lowerPrice = (order.get('quotePrice') - 1);
      order.set('targetPrice', lowerPrice);
      expect(order.isValid()).toBeFalsy();
    });
  });
});
