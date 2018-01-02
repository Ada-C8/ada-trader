import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00
  },

  buy() {
    return this.set('price', (this.get('price') + 1.00));
  },

  sell() {
    return this.set('price', (this.get('price') - 1.00));
  },
});

export default Quote;
