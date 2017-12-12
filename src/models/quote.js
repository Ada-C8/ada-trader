import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00
  },
  buy(attributes) {
    // Implement this function to increase the price by $1.00
    // console.log(this.get('price'));
    this.set('price', this.get('price') + 1);
    // console.log(this.get('price'));
  },

  sell() {
    // Implement this function to decrease the price by $1.00
    this.set('price', this.get('price') - 1);
  },
});

export default Quote;
