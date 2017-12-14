import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00
  },

  buy() {
    const newPrice = this.get('price') + 1.0
    this.set('price',  newPrice);
    // TODO trigger costume event
    this.trigger('buy', {
      price: this.get('price'),
      symbol: this.get('symbol'),
      buy: true
    });
  },

  sell() {
    const newPrice = this.get('price') - 1.0
    this.set('price', newPrice)
    this.trigger('sell', {
      price: this.get('price'),
      symbol: this.get('symbol'),
      buy: false
    });
    // Implement this function to decrease the price by $1.00
  },
});

export default Quote;
