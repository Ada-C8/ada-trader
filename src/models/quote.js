import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00
  },

  buy() {
    const newBuyPrice = this.get('price') + 1
    return newBuyPrice;
    ;
  },

  sell() {
    const newBuyPrice = this.get('price') - 1
    return newBuyPrice;
  },
});

export default Quote;
