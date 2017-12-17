import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  initialize(params) {
    this.target = params.target;
    this.symbol = params.symbol;
    this.price = params.price;
    this.buy = params.buy;
    this.template = params.template;
    // this.quote = params.quote;
  },
});

export default Order;
