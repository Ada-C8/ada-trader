import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    targetPrice: 0.00,
    buy: true,
  },
  buy(event) {
    this.set('symbol', event.target.form[0].value);
    this.set('targetPrice', event.target.form[1].value);
    this.bus.trigger('listOrder', this);
    // console.log(this);
    return this;
  },
  sell(event) {
    this.set('symbol', event.target.form[0].value);
    this.set('targetPrice', event.target.form[1].value);
    this.set('buy', false);
    this.bus.trigger('listOrder', this);
    // console.log(this);
    return this;
  },
  // remove() {
  //
  // }
});

export default Order;
