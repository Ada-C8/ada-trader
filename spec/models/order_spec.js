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
        price: 99.00,
        buy: true
      });

      expect(order.isValid()).toEqual(true);
    });

    it('will not create valid buy order if price is not present', () => {
      const order = new Order({
        quote: quote,
        buy: true
      });

      expect(order.isValid()).toEqual(false);
    });

    it('will not create valid buy order if price is blank string', () => {
      const order = new Order({
        buy: true,
        quote: quote,
        price: ''
      });

      expect(order.isValid()).toEqual(false);
    });

    it('will not create valid buy order if price is greater than or equal to quote', () => {
      const equalPriceOrder = new Order({
        buy: true,
        quote: quote,
        price: 100.00
      });

      expect(equalPriceOrder.isValid()).toEqual(false);

      const greaterPriceOrder = new Order({
        buy: true,
        quote: quote,
        price: 101.00
      });

      expect(greaterPriceOrder.isValid()).toEqual(false);

    });

  });

  describe('Can create sell order', () => {
    it('can create valid sell order if price is greater than quote', () => {
      const order = new Order({
        quote: quote,
        price: 101.00,
        buy: false
      });

      expect(order.isValid()).toEqual(true);
    });

    it('will not create valid sell order if price is not present', () => {
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

    it('will not create valid sell order if price is less than or equal to quote price', () => {
      const equalPriceOrder = new Order({
        quote: quote,
        buy: false,
        price: 100.00
      });

      expect(equalPriceOrder.isValid()).toEqual(false);

      const lesserPriceOrder = new Order({
        quote: quote,
        buy: false,
        price: 99.99
      });

      expect(lesserPriceOrder.isValid()).toEqual(false);

    });
  });
});
