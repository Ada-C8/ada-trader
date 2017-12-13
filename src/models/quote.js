import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00
  },

  buy() {
    // Implement this function to increase the price by $1.00
    this.set('price', (this.get('price')) + 1 );
    console.log('Buy - increased the prive by a dollar');
  },

  sell() {
    // Implement this function to decrease the price by $1.00
    this.set('price', (this.get('price')) - 1 );
    console.log('Sell - decreased the price by a dollar');
  },
});

export default Quote;
