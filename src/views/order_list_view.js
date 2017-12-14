import Backbone from 'backbone';
import _ from 'underscore';
import Order from '../models/order';
import OrderView from '../views/order_view';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'update', this.render);
  },
  render() {
    // Clear the unordered list
    this.$('#orders').empty();
    // Iterate through the list rendering each order
    this.model.forEach((order) => {
      // Create a new OrderView with the model & template
      const orderView = new OrderView({
        model: order,
        template: this.template,
        tagName: 'li',
        className: 'orders',
      });
      // Then render the OrderView and append the resulting HTML to the DOM.
      this.$('#orders').append(orderView.render().$el);
    });
    return this;
  },
});

export default OrderListView;
