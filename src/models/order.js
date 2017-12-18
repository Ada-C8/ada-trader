import Backbone from 'backbone';

const Order = Backbone.Model.extend({

  initialize(attributes) {
  },

  cancelOrder() {
    console.log("we're cancelling your order!");
    this.destroy();//
  },
});

export default Order;
