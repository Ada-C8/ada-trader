import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00
  },

  buy() {
    console.log("CLICK BUY")
    this.set('price', this.get('price') + 1.00)
    // Implement this function to increase the price by $1.00
  },

  sell() {
    console.log("CLICK SELL")
    this.set('price', this.get('price') - 1.00)
  },
});

export default Quote;
