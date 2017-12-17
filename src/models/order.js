import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  initialize(attributes) {
    this.buy = attributes.buy;
    this.targetPrice = attributes.targetPrice;
    this.symbol = attributes.symbol;
  },
});

export default Order;
