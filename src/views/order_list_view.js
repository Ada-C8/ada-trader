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
  addOrder: function(event) {
    event.preventDefault();

    const orderData ={};
    ['symbol', 'price-target'].forEach( (field) => {
      const val = this.$(`input[name=${field}]`).val();
      if (val != '') {
        orderData[field] = val;
      }
    });
    const newOrder= new Order(orderData);

    if (newOrder.isValid()) {
      this.model.add(newOrder);
      // this.updateStatusMessageWith(`New task added: ${newTask.get('task_name')}`);
    } else {
    }
  },
});

export default OrderListView;
