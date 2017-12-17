import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00
  },

  buy() {
    // Implement this function to increase the price by $1.00
    let current_price = this.get('price');
    console.log(current_price);
    this.set('price', current_price += 1);
    let current_symbol = this.get('symbol');
    return { symbol: current_symbol, price: current_price, buy: 'bought' };
  },

  sell() {
    // Implement this function to decrease the price by $1.00
    let current_price = this.get('price');
    console.log(current_price);
    this.set('price', current_price -= 1);
    let current_symbol = this.get('symbol');
    return { symbol: current_symbol, price: current_price, buy: 'sold' };
  },
});

export default Quote;
