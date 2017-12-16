import Backbone from 'backbone';
import Order from '../models/order';
import _ from 'underscore';

const OrderView = Backbone.View.extend({
  initialize(params)  {
    console.log("Initializing in OrderView")
    this.template = params.template;
    // this.bus = this.bus;
    this.listenTo(this.model, 'change', this.render)
  },

  render() {
    const orderTemplate = this.template(this.model.toJSON())
    this.$el.html(orderTemplate);
    return this
  },

  events: {
    'click button.btn-cancel': 'cancelOrder'
  },


  cancelOrder(e) {
    e.preventDefault();
    this.remove()
    this.model.destroy();
  },


});

export default OrderView;

//right now I have OrderView able to initialize a single view of an order and render it;
