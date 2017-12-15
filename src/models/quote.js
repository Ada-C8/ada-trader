import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00,
    buy: false,
  },

  buy() {
    this.set('buy', true);
    this.set('prevPrice', this.get('price'));
    this.set('price', this.get('price') + 1.00);
  },

  sell() {
    this.set('buy', false);
    this.set('prevPrice', this.get('price'));
    this.set('price', this.get('price') - 1.00);
  },
});

export default Quote;
