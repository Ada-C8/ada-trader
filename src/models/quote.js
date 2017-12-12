import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00
  },

  buy() {
    console.log('buying quote');
    console.log(this.get('price'));
    let newPrice = this.get('price') + 1;
    this.set({price: newPrice});
    console.log(this.get('price'));
  },

  sell() {
    // Implement this function to decrease the price by $1.00
    console.log('selling quote');
    console.log(this.get('price'));
    let newPrice = this.get('price') - 1;
    this.set({price: newPrice});
    console.log(this.get('price'));
  },
});

export default Quote;
