import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00
  },

  buy() {
    const current_price = this.get('price');
    this.set('price', current_price + 1.00);
  },

  sell() {
    const current_price = this.get('price');
    this.set('price', current_price - 1.00);
  },
});

export default Quote;
