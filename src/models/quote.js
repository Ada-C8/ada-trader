import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00
  },

  buy() {
    let newPrice = this.get('price') + 1;
    this.set({price: newPrice});
  },

  sell() {
    let newPrice = this.get('price') - 1;
    this.set({price: newPrice});
  },
});

export default Quote;
