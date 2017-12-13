import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  initialize(params) {
    this.symbol = params.symbol;
    this.buy = params.buy;
    this.price = params.price;
    this.bus = params.bus;
    this.listenTo(this.bus, `priceChange${this.symbol}`, this.attemptTrade);
  },
  attemptTrade() {
    console.log('ATTEMPTING TRADE');
  },
});

export default Quote;
