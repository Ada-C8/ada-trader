import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00,
    // buy: false, //moved to quote_view
  },

  buy() {
    let price = this.get('price');
    this.set({price: (price-1)});
    // this.set({buy: true});
    return price;
  },
  sell() {
    let price = this.get('price');
    this.set({price: (price+1)});
    // this.set({buy: false});
    return price;
  },
});

export default Quote;
