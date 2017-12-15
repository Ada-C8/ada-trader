import Quote from 'models/quote';
import Order from 'models/order';

describe('Order Spec', () => {
  let buyOrder;
  let sellOrder;
  beforeEach(() => {
    const quote = new Quote({
      symbol: 'PAWS',
      price: 87.00,
    });

    buyOrder = new Order({
      symbol: quote.get('symbol'),
      targetPrice: 86.00,
      buy: true,
      quote: quote,
    });

    sellOrder = new Order({
      symbol: quote.get('symbol'),
      targetPrice: 88.00,
      buy: false,
      quote: quote,
    });

  });

  describe('Order Model Validation', () => {
    it('returns true if order is valid', () => {
      expect(buyOrder.isValid()).toBeTruthy();
      expect(sellOrder.isValid()).toBeTruthy();
    });

    it("returns false if the order doesn't have a symbol", () => {
      buyOrder.set('symbol', undefined);
      expect(buyOrder.isValid()).toBeFalsy();
    });

    it("returns false if the order's targetPrice is undefined", () => {
      buyOrder.set('targetPrice', undefined);
      expect(buyOrder.isValid()).toBeFalsy();
    });

    it("returns false if the targetPrice is a negative", () => {
      buyOrder.set('targetPrice', -1);
      expect(buyOrder.isValid()).toBeFalsy();
    });

    it("returns false if the targetPrice is not a decimal", () => {
      buyOrder.set('targetPrice', 'poop');
      expect(buyOrder.isValid()).toBeFalsy();
    });

    it("returns false if the order doesn't have a quote", () => {
      buyOrder.set('quote', undefined);
      expect(buyOrder.isValid()).toBeFalsy();
    });


    it("returns false if the order doesn't have buy defined", () => {
      buyOrder.set('buy', undefined);
      expect(buyOrder.isValid()).toBeFalsy();
    });

    it("returns false if the order is buying but higher than the quote's current price", () => {
      buyOrder.set('targetPrice', 100.00);
      expect(buyOrder.isValid()).toBeFalsy();
    });

    it("returns false if the order is selling but lower than the quote's current price", () => {
      sellOrder.set('targetPrice', 1.00);
      expect(sellOrder.isValid()).toBeFalsy();
    });
  });
});
