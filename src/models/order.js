import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  // defaults: {
  //   symbol: 'UNDEF',
  //   targetPrice: 0.00,
  //   buy: buy,
  // },
  initialize(attributes) {
  },

  createOrder() {
    console.log("We're creating your order!");
  },

  cancelOrder() {
    console.log("we're cancelling your order!");
    this.destroy();//
  },
});

export default Order;
