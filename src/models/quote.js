import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00
  },

  buy() {
    // Implement this function to increase the price by $1.00
    const originalPrice = this.get('price');
    this.set('price', originalPrice + 1.00);
    this.set('buy', true);
  },

  sell() {
    // Implement this function to decrease the price by $1.00
    const originalPrice = this.get('price');
    this.set('price', originalPrice - 1.00);
    this.set('buy', false);
  },
});

export default Quote;
