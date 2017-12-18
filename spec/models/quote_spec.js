import Backbone from 'backbone';
import _ from 'underscore';
import Quote from 'models/quote';

describe('Quote spec', () => {
  // let spyEvent;
  let quote;

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
    });

    it('triggers a trade', () => {
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
