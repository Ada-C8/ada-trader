import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00
  },

  buy() {
    // event listener, click on buy or sell button, should call this function
    console.log("this is all the buy method does right now")
    // this.set('price') = this.get('price') + 1.00
    // Implement this function to increase the price by $1.00
  },

  sell() {
    // Implement this function to decrease the price by $1.00
    console.log("this is all the sell method does right now.")
    // this.set('price') = this.get('price') - 1.00
  },
});

export default Quote;
