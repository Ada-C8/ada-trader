import Backbone from 'backbone';
import OrderView from './order_view';
import Order from '../models/order';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'update', this.render);
  },

  render() {
    // Clear the unordered list
    this.$('#orders').empty();
    // Iterate through the list rendering each Order
    this.model.each((order) => {
      // Create a new OrderView with the model & template
      const orderView = new OrderView({
        model: order,
        template: this.template,
        tagName: 'li',
        className: 'order',
      });
      // Then render the OrderView
      // And append the resulting HTML to the DOM.
      this.$('#orders').append(orderView.render().$el);
    });
    return this;
  },


  events: {
    'click #order-buy': 'buyOrder',
    'click #order-sell': 'sellOrder',
  },

  buyOrder(event) {
    event.preventDefault();
    console.log('it clicked!');
    const orderData = {buy: true};
    ['symbol', 'price-target'].forEach( (field) => {
      const val = this.$(`#order-entry-form  [name=${field}]`).val();
      console.log(val);
      orderData[field] = val;
    });
    const newOrder = new Order(orderData);
    console.log(orderData);
  },
  sellOrder(event) {
    event.preventDefault();
    console.log('it clicked!');
    const orderData = {buy: false};
    ['symbol', 'price-target'].forEach( (field) => {
      const val = this.$(`#order-entry-form  [name=${field}]`).val();
      console.log(val);
      orderData[field] = val;
    });
    const newOrder = new Order(orderData);
    console.log(orderData);
  },
});

export default OrderListView;
