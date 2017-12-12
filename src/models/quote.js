import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00
  },

  buy() {
    // Implement this function to increase the price by $1.00
    let currentPrice = this.get('price');
    this.set('price', currentPrice + 1.00);
  },

  sell() {
    // Implement this function to decrease the price by $1.00
    let currentPrice = this.get('price');
    this.set('price', currentPrice - 1.00);
  },
});

export default Quote;


// See a list of quotes in the left side of the top panel, including the:
// Symbol for each quote
// Market price for each quote
// Buy button for each quote
// Sell button for each quote
// As a user, when I:
//
// Click the Buy button for a quote:
// That quote's market price increases by $1.00
// Click the Sell button for a quote:
// That quote's market price decreases by $1.00
// Tests
//
// Tests have been provided for the two custom functions that you will need to implement for this wave. In later waves you will need to write your own tests for any custom functions that you add to your models, as well as any validations you have.
