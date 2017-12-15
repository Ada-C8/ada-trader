import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00,
    buy: true,
  },
  initialize(params) {
    // this.listenTo(this.bus, 'boughtQuote', this.addQuote);
    // this.listenTo(this.bus, 'soldQuote', this.soldQuote);
    // this.bus = params.bus;
  },
  buy(event) {
    // console.log('here');
    // console.log(this.bus);
    this.set('symbol', event.target.form[0].value);
    this.set('price', event.target.form[1].value);
    // this.set('buy', true);
    // this.save();
    this.bus.trigger('listOrder', this);
    // console.log(this);
    return this;
  },

  sell() {
    this.set('symbol', event.target.form[0].value);
    this.set('price', event.target.form[1].value);
    this.set('buy', false);
    this.bus.trigger('listOrder', this);
    // this.save();
    // this.bus.trigger('sellOrder', this);
    return this;
  }
});

export default Order;
