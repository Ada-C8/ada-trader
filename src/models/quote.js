import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00,
  },

  buy() {
    // Implement this function to increase the price by $1.00
    const newPrice = (this.get('price') + 1);
    console.log(`price of ${this.get('symbol')} changing from ${this.get('price')} to ${newPrice}`);
    this.set('price', newPrice);
  },

  sell() {
    // Implement this function to decrease the price by $1.00
    const newPrice = (this.get('price') - 1);
    console.log(`price of ${this.get('symbol')} changing from ${this.get('price')} to ${newPrice}`);
    this.set('price', newPrice);
  },

});

export default Quote;
