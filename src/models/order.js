import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  initialize(params) {
    this.targetPrice = params.targetPrice;
    this.symbol = params.symbol;
    // this.price = params.price;
    this.bus = params.bus
    this.buy = params.buy;
    // this.template = params.template;
    this.quote = params.quote;
  },
});

export default Order;
