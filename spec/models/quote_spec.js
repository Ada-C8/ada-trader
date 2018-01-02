import Backbone from 'backbone';
import _ from 'underscore';
import Quote from 'models/quote';

describe('Quote spec', () => {
  // let spyEvent;
  let quote;
  let listener = _.extend({}, Backbone.Events);

  beforeEach(() => {
    quote = new Quote({
      symbol: 'HELLO',
      price: 100.00,
      bus: _.extend({}, Backbone.Events),
    });
  });

  describe('changePrice function', () => {
    it('sets a new price', () => {
      quote.changePrice(50, 10, true);

      expect(quote.get('price')).toEqual(50);

      quote.changePrice(); // NOTE: It does whatever the first param is regardless... room for refactoring.

      expect(quote.get('price')).toBeUndefined();

      quote.changePrice(10, true);

      expect(quote.get('price')).toEqual(10);

      quote.changePrice(true);

      expect(quote.get('price')).toBeTruthy();

      quote.changePrice('PIE');

      expect(quote.get('price')).toEqual('PIE');
    });

    it('triggers a trade', () => {
      listener.listenTo(quote.bus, 'trade', () => {
        expect(true).toBeTruthy();
      }); // NOTE: Is this sufficient to test a trigger exists?
      // TODO: Figure out how to handle triggers
      // spyEvent = spyOn(quote.get('bus'), 'trade');
      // quote.changePrice(50, 10, true);
      //
      //
      // expect(spyEvent).toHaveBeenTriggered();
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
// TODO: Test any custom methods
// TODO: Create Order spec to test order models (esp validations)
// TODO: Optional write tests which verify that limit orders are executed and destroyed when the relevant stock reaches the orders target price
});
