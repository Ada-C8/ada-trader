import Backbone from 'backbone';
import _ from 'underscore';
import Quote from 'models/quote';

describe('Quote spec', () => {
  let quote;
  let listenerObj;
  beforeEach(() => {
    quote = new Quote({
      symbol: 'HELLO',
      price: 100.00,
    });

    listenerObj = {}
    _.extend(listenerObj, Backbone.Events);
  });

  describe('Buy function', () => {
    it('increases the price by $1.00', () => {
      const startPrice = quote.get('price');
      quote.buy();

      expect(quote.get('price')).toEqual(startPrice + 1.00);
    });

    it('emits an addTrade event when buy is called', () => {
      listenerObj.listenTo(quote, 'addTrade', () => {
        expect(true).toBeTruthy();
      });
      quote.buy();
    });
  });

  describe('Sell function', () => {
    it('decreases the price by $1.00', () => {
      const startPrice = quote.get('price');
      quote.sell();

      expect(quote.get('price')).toEqual(startPrice - 1.00);
    });

    it('emits an addTrade event when sell is called', () => {
      listenerObj.listenTo(quote, 'addTrade', () => {
        expect(true).toBeTruthy();
      });
      quote.sell();
    });
  });

});
