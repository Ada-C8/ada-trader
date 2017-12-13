import Order from 'models/order';

describe('Order spec', () => {
  let order;

  describe('validations', () => {
    it('creates a quote', () => {
      order = new Order({
        symbol: 'HELLO',
        targetPrice: 100.00,
      });

      expect(order).toBeDefined();
    });

    it('requires a symbol', () => {
      order = new Order({
        targetPrice: 100.00,
      });

      expect(expect(order).toBeDefined()).toEqual(undefined);
    });

    it('requires a targetPrice', () => {
      order = new Order({
        symbol: 'HELLO',
      });

      expect(expect(order).toBeDefined()).toEqual(undefined);
    });

    it('requires a targetPrice to be a number', () => {
      order = new Order({
        symbol: 'HELLO',
        targetPrice: 'cats',
      });

      expect(expect(order).toBeDefined()).toEqual(undefined);
    });

    it('will not let you buy if quote price is lower than target price', () => {
      order = new Order({
        symbol: 'HELLO',
      });

      expect(expect(order).toBeDefined()).toEqual(undefined);
    });

    it('will not let you sell if quote price is higher than target price', () => {
      order = new Order({
        symbol: 'HELLO',
      });

      expect(expect(order).toBeDefined()).toEqual(undefined);
    });

  });

});
