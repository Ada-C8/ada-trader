import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    targetPrice: 0.00
  },
  buy() {
    this.set('targetPrice', this.get('targetPrice'));
  },

  sell() {
    this.set('targetPrice', this.get('targetPrice'));
  },
});

export default Order;
