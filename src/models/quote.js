import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00
  },

  buy() {
    // this.price.set(this.price.get('is_complete') + 1);
    console.log('doin');
    return 'moké';
  },

  sell() {
    // Implement this function to decrease the price by $1.00
  },
});

export default Quote;
