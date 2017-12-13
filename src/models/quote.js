import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00
  },

  buy() {
    return this.get('price') + 1;
  },

  sell() {
    return this.get('price') - 1;
  },

  // postBuy() {
  //
  // }
});

export default Quote;
