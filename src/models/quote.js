import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00
  },

  buy() {
    let current_price = this.get('price');
    this.set('price', current_price += 1);
    let current_symbol = this.get('symbol');
    return { symbol: current_symbol, price: current_price, buy: 'bought' };
  },

  sell() {
    let current_price = this.get('price');
    this.set('price', current_price -= 1);
    let current_symbol = this.get('symbol');
    return { symbol: current_symbol, price: current_price, buy: 'sold' };
  },
});

export default Quote;
