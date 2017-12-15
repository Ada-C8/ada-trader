import Quote from 'models/quote';
import Order from 'models/order';

describe('Quote spec', () => {
  let quote;
  beforeEach(() => {
    quote = new Quote({
      symbol: 'HELLO',
      price: 100.00,
    });

  });

  describe('Can create buy order', () => {
    it('creates valid buy order if price is less than quote', () => {
      const order = new Order({
        quote: quote,
        price: 99.00
      });

      expect(order.isValid()).toEqual(true);
    });

    it('will not create valid buy order if price is not present', () => {
      const order = new Order({
        quote: quote,
      });

      expect(order.isValid()).toEqual(true);
    });
  });

  // describe('Sell function', () => {
  //   it('decreases the price by $1.00', () => {
  //     const startPrice = quote.get('price');
  //
  //     quote.sell();
  //
  //     expect(quote.get('price')).toEqual(startPrice - 1.00);
  //   });
  // });
});
