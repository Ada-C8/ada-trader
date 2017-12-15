import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00
  },

  buy() {
    // Implement this function to increase the price by $1.00
    this.trigger('trade', {
      buy: true,
      price: this.get('price'),
      symbol: this.get('symbol')
    });
    this.set('price', this.get('price') + 1.00);
  },

  sell() {
    this.trigger('trade', {
      buy: false,
      price: this.get('price'),
      symbol: this.get('symbol')
    });
    this.set('price', this.get('price') - 1.00);
  },
});

export default Quote;
