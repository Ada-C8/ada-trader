import Backbone from 'backbone';
import Order from '../models/order';
import OrderView  from './order_view';

const OrderListView = Backbone.View.extend({
  nitialize(params) {
    // save template
    this.template = params.template;
    // add bus
    this.bus = params.bus;

    // listens for changes in our template
    this.listenTo(this.model, 'update', this.render);
  },

  render() {
    // Clear the DOM Elements so we can redraw them
    this.$('#orders').empty();

    // Iterate through the list rendering each order
    this.model.each((order) => {
      // create a new OrderView with the model and template
      const orderView = new OrderView({
        model: Order,
        template: this.template,
        tagName: 'li',
        className: 'order',
        bus: this.bus,
      });
      // Then render the Order and append the resulting HTML to the document
      this.$('#orders').append(orderView.render().$el);
    });
    return this;
  },
});

export default OrderListView;
