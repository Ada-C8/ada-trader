import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00
  },

  buy() {
    const newPrice = (this.get('price') + 1)
    this.set('price', newPrice)
    return newPrice
  },

  sell() {
    const newPrice = (this.get('price') - 1)
    this.set('price', newPrice)
    return newPrice

    // Implement this function to decrease the price by $1.00
  },
});

export default Quote;
