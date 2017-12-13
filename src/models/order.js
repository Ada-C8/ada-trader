import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  initialize(params) {
    this.symbol = params.symbol;
    this.buy = params.buy;
    this.targetPrice = params.targetPrice;
    this.bus = params.bus;
  },
});

export default Order;
