import Quote from 'models/quote';
import _ from 'underscore';
import Backbone from 'backbone';

describe('Quote spec', () => {
  let quote;
  let eventBus;
  beforeEach(() => {
    eventBus = {};
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

  describe('responds to quote model change', () => {
    it('triggers a priceChange event on the bus in response to a quote model change', () => {
      const spy = spyOn(eventBus, 'trigger');
      quote.trigger('change');

      expect(spy).toHaveBeenCalledWith(`priceChange${quote.get('symbol')}`, quote.get('price').toFixed(2));
    });
  })
});
