import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00,
    bus: null,
  },
  initialize() { // NOTE: Because bus and symbol doesn't change
    this.bus = this.get('bus');
    this.symbol = this.get('symbol');
  },
  buy() {
    const price = this.get('price');
    this.bus.trigger('trade', {symbol: this.symbol, price: price, buy: true});
    this.set('price', price + 1);
  },
  sell() {
    const price = this.get('price') - 1;
    this.bus.trigger('trade', {symbol: this.symbol, price: price, buy: false});
    this.set('price', price - 1);
  },
});

export default Quote;
