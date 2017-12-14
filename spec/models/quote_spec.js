import Quote from 'models/quote';
import _ from 'underscore';
import Backbone from 'backbone';

describe('Quote spec', () => {
  let quote;
  beforeEach(() => {
    let eventBus = {};
    eventBus = _.extend(eventBus, Backbone.Events);
    quote = new Quote({
      symbol: 'HELLO',
      price: 100.00,
      bus: eventBus,
    });
  });

  describe('Buy function', () => {
    it('increases the price by $1.00', () => {
      const startPrice = quote.get('price');

      quote.buy();

      expect(quote.get('price')).toEqual(startPrice + 1.00);
    });
  });

  describe('Sell function', () => {
    it('decreases the price by $1.00', () => {
      const startPrice = quote.get('price');

      quote.sell();

      expect(quote.get('price')).toEqual(startPrice - 1.00);
    });
  });
});
