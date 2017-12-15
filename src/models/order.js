import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  default: {
    symbol: 'UNDEF',
    targetPrice: 0.00,
    actualPrice: 0.00
  },

  initalize(params) {
    console.log("You placed an order!")
  },

  validate() {

  }

});

export default Order;
