import Backbone from 'backbone';
import _ from 'underscore';

import Order from '../models/order'
import OrderView from './order_view';


const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;

    this.listenTo(this.model, 'update', this.render)

    this.listenTo(this.bus, 'newOrder', this.addOrder);
    this.listenTo(this.bus, 'newOrder', this.render);
    // this.listenTo(this.bus, 'update', this.completeOrder)

  },
  render(orderObject) {
    this.$('#orders').empty();
    // console.log('render order_list_view');
    // console.log(this.model);
    this.model.each((order) => {
      // console.log(order);
      const orderView = new OrderView({
        model: order,
        template: this.template,
        tagName:'li',
        className: 'order',
        bus: this.bus,
      });
      // console.log(orderView);
      this.$('#orders').append(orderView.render().$el);
    });
    return this;
  },
  updateStatusMessageFrom(messageHash) {
    const $statusMessages = this.$('#status-messages');
    $statusMessages.empty();
    Object.keys(messageHash).forEach((messageType) => {
      messageHash[messageType].forEach((message) => {
        $statusMessages.append(`<li>${message}</li>`);
      });
    });
    $statusMessages.show();
  },
  updateStatusMessage(message) {
    this.updateStatusMessageFrom({
      'order': [message],
    });
  },
  addOrder(orderObject) {
    // console.log(orderObject);
    const newOrder = new Order(orderObject);
    if (newOrder.isValid()) {
      console.log('I am a valid order')
      this.model.add(newOrder);
      // this.clearFormData();
      this.updateStatusMessage(`${newOrder.get('symbol')} Created!`);

    } else {
      this.updateStatusMessageFrom(newOrder.validationError);
      newOrder.destroy();
    }
  },
})

export default OrderListView;
