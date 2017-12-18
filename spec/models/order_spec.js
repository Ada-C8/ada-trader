import Order from 'models/order';
import Quote from 'models/quote';

describe('Order spec', () => {
  let order;
  let quote;
  beforeEach(() => {
    quote = new Quote({
      symbol: 'DOGS',
      price: 66,
    });
  });

  describe('Need a targetPrice', () => {
    it('is invalid without a targetPrice', () => {
      order = new Order({
        symbol: 'DOGS',
        buy: 'buy',
        quote: quote,
      })

      expect(order.isValid()).toBeFalsy();
    });
    it('is valid with a targetPrice', () => {
      order = new Order({
        symbol: 'DOGS',
        targetPrice: 55,
        buy: 'buy',
        quote: quote,
      })

      expect(order.isValid()).toBeTruthy();
    });
  });

  describe('Need valid targetPrice', () => {
    it('(BUY) must have targetPrice lower than trade price', () => {
      order = new Order({
        symbol: 'DOGS',
        targetPrice: 999,
        buy: "buy",
        quote: quote,
      })
      expect(order.isValid()).toBeFalsy();

      order.set('targetPrice', 66)
      expect(order.isValid()).toBeFalsy();

      order.set('targetPrice', 55)
      expect(order.isValid()).toBeTruthy();
    });

    it('(SELL) must have a targetPrice higher than trade price', () => {
      order = new Order({
        symbol: 'DOGS',
        targetPrice: 44,
        buy: "sell",
        quote: quote,
      })
      expect(order.isValid()).toBeFalsy();

      order.set('targetPrice', 66)
      expect(order.isValid()).toBeFalsy();

      order.set('targetPrice', 77)
      expect(order.isValid()).toBeTruthy();
    });

  });

});
