import Order from 'models/order';
import Quote from 'models/quote';

describe('Order Spec', () => {
  let quote;

  beforeEach(() => {
    quote  = new Quote({
      symbol: 'HELLO',
      price: 100.00
    });

  });

  describe('Can create order', () => {
    it('creates valid autoBuy if price is less than quote', () => {
      const order = new Order({
        quote: quote,
        price: 70.00,
        buy: true
      });

      expect(order.isValid()).toEqual(true);
    });

    it('will not create valid order if no price', () => {
      const order = new Order({
        quote: quote,
        buy: true
      });

      expect(order.isValid()).toEqual(false);
    });

    it('will not create valid buy order if price is invalid', () => {
      const order = new Order({
        buy: true,
        quote: quote,
        price: false
      });

      expect(order.isValid()).toEqual(false);
    });

    it('will only create buy order if price is higher than specified', () => {
      const higher = new Order({
        buy: true,
        quote: quote,
        price: 101.00
      });

      expect(higher.isValid()).toEqual(false);
    });

  });

  describe('Can create autoSell order', () => {
    it('can create valid autoSell order if price is greater than quote', () => {
      const order = new Order({
        quote: quote,
        price: 101.00,
        buy: false
      });

      expect(order.isValid()).toEqual(true);
    });

    it('will not create valid sell order if no price', () => {
      const order = new Order({
        quote: quote,
        buy: false
      });

      expect(order.isValid()).toEqual(false);
    });

    it('will not create valid sell order if price is blank string', () => {
      const order = new Order({
        quote: quote,
        buy: false,
        price: ''
      });

      expect(order.isValid()).toEqual(false);
    });

    it('will not create valid sell order if price is not higher than quote', () => {
      const equal = new Order({
        quote: quote,
        buy: false,
        price: 100.00
      });

      expect(equal.isValid()).toEqual(false);

      const lower = new Order({
        quote: quote,
        buy: false,
        price: 99.99
      });

      expect(lower.isValid()).toEqual(false);
    });
  });
});
