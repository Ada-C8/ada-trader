import Backbone from 'backbone';


const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00
  },

  buy() {
    console.log(`${this.get('symbol')} has been bought for ${this.get('price')}`);
    this.set('price', this.get('price') + 1);
  },

  sell() {
    console.log(`${this.get('symbol')} has been sold for ${this.get('price')}`)
    this.set('price', this.get('price') - 1)
  },
});

export default Quote;
