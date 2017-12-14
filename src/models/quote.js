import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00
  },

  buy() {
    console.log('click into buy()');
      this.set('price', this.get('price') + 1)
      console.log(this.get('price'));
    },

  sell() {
    console.log('click into sell()');
    this.set('price', this.get('price') - 1)
  },
});

export default Quote;
