import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00
  },

  buy() {
    console.log('In the buy() method in the quote model')
    this.set('price', this.get('price') + 1);
    return this.get('price')+1;
  },

  sell() {
    console.log('In the sell() method in the quote model')
    this.set('price', this.get('price') - 1);
    return this.get('price') - 1;
  },

});

export default Quote;
