import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00
  },
  buy() {
    this.set('price', this.get('price') + 1);
    this.set('buy', true);
    this.trigger('tradeMe', this);
  },
  sell() {
    this.set('price', this.get('price') - 1);
    this.set('buy', false);
    this.trigger('tradeMe', this);
  },
});

export default Quote;
