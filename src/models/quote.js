import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00
  },

  buy() {
    this.set('price', (this.price-1));
  },

  sell() {
    // Implement this function to decrease the price by $1.00
  },
});

export default Quote;
