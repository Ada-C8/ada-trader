import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00
  },

  buy() {
    const current_price = this.get('price');
    this.set('price', current_price + 1.00);
    console.log(`BUYING ${this.get('symbol')} at ${this.get('price')}`);
  },

  sell() {
    const current_price = this.get('price');
    this.set('price', current_price - 1.00);
    console.log(`SELLING ${this.get('symbol')} at ${this.get('price')}`);

  },
});

export default Quote;
