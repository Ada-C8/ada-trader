import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  // defaults: {
  //   symbol: 'UNDEF',
  //   targetPrice: 0.00,
  //   buy: buy,
  // },
  initialize(attributes) {
  //   this.template = params.template;
  //   this.bus = params.bus;
  //
  //   // this.listentTo(this.model, 'change', this.render);
  },

  makeLimitOrder() {
  },

  cancelLimitOrder() {
  },
});

export default Order;
