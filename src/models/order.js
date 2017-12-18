import Backbone from 'backbone';

const Order = Backbone.Model.extend({

// need to do validations
  initialize(attributes) {
  },

  cancelOrder() {
    console.log("we're cancelling your order!");
    this.destroy();//
  },
});

export default Order;
