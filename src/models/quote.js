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
  changePrice(newPrice, oldPrice, isBuy) {
    this.set('price', newPrice);
    this.bus.trigger('trade', {symbol: this.symbol, price: oldPrice, buy: isBuy});
  },
  buy() {
    const price = this.get('price');
    this.changePrice(price + 1, price, true);
  },
  sell() {
    const price = this.get('price');
    this.changePrice(price - 1, price, false);
  },
});

export default Quote;
