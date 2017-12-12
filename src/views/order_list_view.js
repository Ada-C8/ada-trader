import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';

import OrderView from '../views/order_view';
import Order from '../models/order'

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'update', this.render);
  },
  render() {
    // Clear the unordered list
    // this.$('#quotes-container').empty();
    // Iterate through the list rendering each Task
    this.model.each((order) => {
      // Create a new TaskView with the model & template
      const orderView = new OrderView({
        model: order,
        template: this.template,
        // tagName: 'li',
        className: 'order',
      });
      // Then render the TaskView
      // And append the resulting HTML to the DOM.
      this.$('#orders').append(orderView.render().$el);
    });
    return this;
  },
  events: {
    'click #order-form .btn-buy': 'orderBuy',
    'click button.btn-sell': 'orderSell',
  },
  orderBuy: function(event) {
    event.preventDefault();
    const buyData = {};
    ['symbol', 'targetPrice'].forEach( (field) => {
      const val = $(`#${field}`).val();
      console.log(val);
      if (field == 'targetPrice') {
        console.log('inside the targetPrice field')
        buyData[field] = parseInt(val);
      }
      else {
        buyData[field] = val;
      }
    });
    buyData['buy'] = true;

    const newOrder = new Order(buyData);
    console.log(newOrder);

    if (newOrder.isValid()) {
      console.log('IS VALID');
      this.model.add(newOrder);
      // this.updateStatusMessageWith(`New task added: ${newTask.get('task_name')}`);
    } else {
      console.log('FAIL');
      // this.updateStatusMessageFrom(newTask.validationError);
    }
  },
  // updateStatusMessageFrom: function(messageHash) {
  //   const statusMessagesEl = this.$('#status-messages');
  //   statusMessagesEl.empty();
  //   _.each(messageHash, (messageType) => {
  //     messageType.forEach((message) => {
  //       statusMessagesEl.append(`<li>${message}</li>`);
  //     })
  //   });
  //   statusMessagesEl.show();
  // },
  // updateStatusMessageWith: function(message) {
  //   const statusMessagesEl = this.$('#status-messages');
  //   statusMessagesEl.empty();
  //   statusMessagesEl.append(`<li>${message}</li>`);
  //   statusMessagesEl.show();
  // }
});

export default OrderListView;
