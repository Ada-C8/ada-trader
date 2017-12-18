import Backbone from 'backbone';
import Order from '../models/order';


const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;

    // this.listenTo(this.model, 'change', this.render);
  },

  render(){
    console.log("In the render function for order view");
    const compiledTemplate = this.template(this.model.toJSON());

    console.log("Compiled the template");
    this.$el.html(compiledTemplate);

    console.log("This is an order!");
    return this;
  },


  events: {
    'click button.btn-cancel': 'cancelOrder',

  },

  cancelOrder(event) {
    console.log("You clicked the cancel button");
    console.log(event);
    this.model.cancelOrder();
    console.log("This method is working fine!")
  },



  // define events




}); // end order view

export default OrderView
