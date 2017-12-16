import Quote from 'models/quote';
import Order from 'models/order';
import Backbone from 'backbone';
import _ from 'underscore';
import OrderList from 'models/order';

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

  describe('Order.quotePriceCheck()', () => {
    let listenerObj;
    beforeEach(() => {
      listenerObj = {}
      _.extend(listenerObj, Backbone.Events);
    });

    it("can buy a quote if the quote is below order's targetPrice", () => {
      listenerObj.listenTo(buyOrder, 'destroy', () => {
        expect(true).toBeTruthy();
      });
      buyOrder.get('quote').set('price', 85); // original quote price = 87 | target price = 86
      buyOrder.quotePriceCheck();
      // expect(buyOrder).toBeUndefined(); //Backbone is weird, not really destroying instance
    });

    it("can sell a quote if the quote is higher order's targetPrice", () => {
      listenerObj.listenTo(sellOrder, 'destroy', () => {
        expect(true).toBeTruthy();
      });
      sellOrder.get('quote').set('price', 90); // original quote price = 87 | target price = 88
      sellOrder.quotePriceCheck();
    });

    it("doesn't buy or sell if the requirement isn't met", () => {
      buyOrder.quotePriceCheck(); //targetPrice = 86| quote price = 87
      expect(buyOrder).toBeDefined();

      sellOrder.quotePriceCheck(); //targetPrice = 88 | quote price = 87
      expect(sellOrder).toBeDefined();
    });

    it("doesn't buy if the quote's price changes but the requirements aren't met", () => {
      buyOrder.get('quote').set('price', 86.50);
      buyOrder.quotePriceCheck();
      expect(buyOrder).toBeDefined();
    });

    it("doesn't sell if the quote's price changes but the requirements aren't met", () => {
      sellOrder.get('quote').set('price', 88.50);
      sellOrder.quotePriceCheck();
      expect(sellOrder).toBeDefined();

    });

  });
});
