import Backbone from 'backbone';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
  },

  render(){
    const compiledTemplate =
    this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    console.log("This is an order!");
    return this;
  },

  events: {

  },

  // define events



}); // end quote view

export default OrderView
