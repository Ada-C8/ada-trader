import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  // defaults: {
  //   symbol: 'UNDEF',
  //   targetPrice: 0.00,
  //   buy: buy,
  // },
  initialize(attributes) {
  },

  createBuyOrder() {
    console.log("BUY!");
  },

  createSellOrder(){
    console.log("SELL!");
  },

  cancelOrder() {
    console.log("we're cancelling your order!");
    this.destroy();//
  },
});

export default Order;
