import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00,

  },

  buy() {
    let price = this.get('price');
    this.set({price: (price+1)});
    return price;
  },
  sell() {
    let price = this.get('price');
    this.set({price: (price-1)});
    return price;
  },
});

export default Quote;
