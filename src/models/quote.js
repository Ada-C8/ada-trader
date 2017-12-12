import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00
  },

// increase price by 1
  buy() {
    this.set('price', this.get('price') + 1.00);
  },

// decrease price by 1
  sell() {
    this.set('price', this.get('price') - 1.00);
  },
});

export default Quote;
