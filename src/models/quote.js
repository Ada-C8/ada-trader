import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00
  },

  buy() {
    const tradePrice = (this.get('price'))
    const newPrice = tradePrice + 1
    this.set('price', newPrice)
    return tradePrice
  },

  sell() {
    const tradePrice = (this.get('price'))
    const newPrice = tradePrice - 1
    this.set('price', newPrice)
    return tradePrice
  },
});

export default Quote;
