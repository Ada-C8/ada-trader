import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    target_price: 0.00,
    order_type: 'medium'
  },
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
