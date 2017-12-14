import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00,
    bus: null,
  },
  initialize() {
    this.bus = this.get('bus'); // NOTE: Because bus doesn't change
    this.symbol = this.get('symbol');
  },
  changePrice(newPrice, isBuy) {
    this.set('price', newPrice);
    this.bus.trigger('trade', {symbol: this.symbol, price: newPrice, buy: isBuy})
  },
  buy() {
    this.changePrice(this.get('price') + 1, true);
  },

  sell() {
    this.changePrice(this.get('price') - 1, false);
  },
});

export default Quote;
