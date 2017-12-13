import Order from 'models/order';

describe('Order spec', () => {
  let order;

  describe('validations', () => {
    it('increases the price by $1.00', () => {
      order = new Order({
        symbol: 'HELLO',
        price: 100.00,
      });

      const startPrice = quote.get('price');

      quote.buy();

      expect(quote.get('price')).toEqual(startPrice + 1.00);
    });

  });

});
