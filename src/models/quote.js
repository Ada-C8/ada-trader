import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00
  },

  buy() {
    const currentPrice = this.get('price');
    this.set('price', currentPrice + 1.00);
  },

  sell() {
    const currentPrice = this.get('price');
    this.set('price', currentPrice - 1.00);
  },
});

export default Quote;
