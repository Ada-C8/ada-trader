import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    targetPrice: 0.00
  },

  buy() {
    this.get('target-price');
  },

  sell() {
    this.get('target-price');
  },
});

export default Order;
