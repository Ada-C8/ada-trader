import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  // defaults: {
  //   symbol: 'UNDEF',
  //   targetPrice: 0.00,
  //   buy: buy,
  // },
  initialize(attributes) {
  //   this.template = params.template;
  //   this.bus = params.bus;
  //
  //   // this.listentTo(this.model, 'change', this.render);
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
