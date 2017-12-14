import Order from 'models/order';
import Quote from 'models/quote';

describe('Order spec', () => {
  let order;
  let quote;
  beforeEach(() => {
    quote = new Quote({
      symbol: 'HELLO',
      price: 100.00
    });
  });

  describe('targetPrice is required', () => {
    it('is invalid if no targetPrice', () => {
      order = new Order({
        symbol: 'HELLO',
        buy: true,
        quote: quote,
      })

      expect(order.isValid()).toBeFalsy();
    });
    it('is valid if there is a targetPrice', () => {
      order = new Order({
        symbol: 'HELLO',
        targetPrice: 90.00,
        buy: true,
        quote: quote,
      })

      expect(order.isValid()).toBeTruthy();
    });
  });

  describe('valid targetPrice requried', () => {
    it('must have a targetPrice lower than the current quote price for buy', () => {
      order = new Order({
        symbol: 'HELLO',
        targetPrice: 110.00,
        buy: true,
        quote: quote,
      })

      expect(order.isValid()).toBeFalsy();

      order.set('targetPrice', 100.00)

      expect(order.isValid()).toBeFalsy();

      order.set('targetPrice', 90.00)

      expect(order.isValid()).toBeTruthy();
    });

    it('must have a targetPrice higher than the current quote price for sell', () => {
      order = new Order({
        symbol: 'HELLO',
        targetPrice: 90.00,
        buy: false,
        quote: quote,
      })

      expect(order.isValid()).toBeFalsy();

      order.set('targetPrice', 100.00)

      expect(order.isValid()).toBeFalsy();

      order.set('targetPrice', 110.00)

      expect(order.isValid()).toBeTruthy();
    });

  });

});
