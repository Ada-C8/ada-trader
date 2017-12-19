import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00
  },

  buy() {
    let buyPrice = this.get('price');
    let newPrice = buyPrice + 1.00;
    this.set('price', newPrice)
  },

  sell() {
    let sellPrice = this.get('price');
    let newPrice = sellPrice - 1.00;
    this.set('price', newPrice)
  },
});

export default Quote;
