import Backbone from 'backbone';
import Order from '../models/order';


const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;

    // if you hear the price_change, call the checkPrice method to find out the new price.
    this.listenTo(this.model, 'change', this.render);
  },

  render(){
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },


  events: {
    'click button.btn-cancel': 'cancelOrder',
  },

  cancelOrder(event) {
    this.model.cancelOrder();
  },

  // checkPrice(quote) {






}); // end order view

export default OrderView
