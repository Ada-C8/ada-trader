import Backbone from 'backbone';
import _ from 'underscore';

import Order from 'models/order';
import Quote from 'models/quote';

import OrderList from 'collections/order_list'

describe('Order spec', () => {
  let quote;

  let buyOrder100;
  let buyOrder80;

  let sellOrder100;
  let sellOrder120;

  beforeEach(() => {
    quote = new Quote ({
      symbol: 'HELLO',
      price: 100.00,
    });

    buyOrder100 = new Order({
      buy: true,
      symbol: 'HELLO',
      targetPrice: 100.00,
      matchedQuote: quote,
    });

    buyOrder80 = new Order({
      buy: true,
      symbol: 'HELLO',
      targetPrice: 80.00,
      matchedQuote: quote,
    });

    sellOrder100 = new Order({
      buy: false,
      symbol: 'HELLO',
      targetPrice: 100.00,
      matchedQuote: quote,
    });

    sellOrder120 = new Order({
      buy: false,
      symbol: 'HELLO',
      targetPrice: 120.00,
      matchedQuote: quote,
    });
  });

  describe('validate function', () => {
    it('is valid with good buy data', () => {
      expect(buyOrder100.isValid()).toBe(true);
      expect(buyOrder80.isValid()).toBe(true);
    });

    it('is valid with good sell data', () => {
      expect(sellOrder100.isValid()).toBe(true);
      expect(sellOrder120.isValid()).toBe(true);
    });

    it('is not valid without a symbol', () => {
      buyOrder100.set('symbol', '');
      expect(buyOrder100.isValid()).toBe(false);

      sellOrder100.set('symbol', '');
      expect(sellOrder100.isValid()).toBe(false);
    });

    it('is not valid without a targetPrice', () => {
      buyOrder100.set('targetPrice', null);
      expect(buyOrder100.isValid()).toBe(false);

      sellOrder100.set('targetPrice', null);
      expect(sellOrder100.isValid()).toBe(false);
    });

    it('is not valid with bad targetPrice', () => {
      buyOrder100.set('targetPrice', 200);
      expect(buyOrder100.isValid()).toBe(false);

      sellOrder100.set('targetPrice', 50);
      expect(sellOrder100.isValid()).toBe(false);
    });

  });

  describe('priceCheck function', () => {

    let buyOrder;
    let sellOrder;
    let listener;
    let testOrderList;

    beforeEach(() => {
      listener = {};
      listener = _.extend(listener, Backbone.Events);

      quote = new Quote ({
        symbol: 'HELLO',
        price: 100.00,
      });

      buyOrder = new Order({
        buy: true,
        symbol: 'HELLO',
        targetPrice: 99,
        matchedQuote: quote,
      });

      sellOrder = new Order({
        buy: false,
        symbol: 'HELLO',
        targetPrice: 101.00,
        matchedQuote: quote,
      });

      testOrderList = new OrderList([buyOrder, sellOrder]);
    });

    it("buys if quote's price is equal to or below order's targetPrice", () => {
      listener.listenTo(buyOrder, 'destroy', () => {
        expect(true).toBeTruthy();
      });
      buyOrder.get('matchedQuote').set('price', 99);
      buyOrder.priceCheck();
      expect(testOrderList.length).toEqual(1);

      buyOrder.get('matchedQuote').set('price', 98);
      buyOrder.priceCheck();
      expect(testOrderList.length).toEqual(1);
    });

    it("sells if quote's price is equal to or above order's targetPrice", () => {
      listener.listenTo(sellOrder, 'destroy', () => {
        expect(true).toBeTruthy();
      });
      sellOrder.get('matchedQuote').set('price', 101);
      sellOrder.priceCheck();
      expect(testOrderList.length).toEqual(1);

      sellOrder.get('matchedQuote').set('price', 102);
      sellOrder.priceCheck();
      expect(testOrderList.length).toEqual(1);
    });

    it("won't buy if quote's price is above order's targetPrice",() => {
      buyOrder.get('matchedQuote').set('price', 1000);
      buyOrder.priceCheck();
      expect(testOrderList.length).toEqual(2);
    });

    it("won't sell if quote's price is below order's targetPrice",() => {
      sellOrder.get('matchedQuote').set('price', 1);
      sellOrder.priceCheck();
      expect(testOrderList.length).toEqual(2);
    });


  });
});
