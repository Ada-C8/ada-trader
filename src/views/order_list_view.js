import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';

import OrderView from '../views/order_view';
import Order from '../models/order'

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'update', this.render);
    this.listenTo(this.model, 'change', this.render);

  },
  render() {
    // this.$('#quotes-container').empty();
    this.model.each((order) => {
      const orderView = new OrderView({
        model: order,
        template: this.template,
        className: 'order',
      });
      this.listenTo(orderView, 'cancelMe', this.cancelOrder);
      console.log(this.quoteList);
      this.listenTo(this.quoteList, 'quoteChanged', this.checkQuote);
      this.$('#orders').append(orderView.render().$el);
    });
    return this;
  },
  events: {
    'click #order-form .btn-buy': 'orderBuy',
    'click #order-form .btn-sell': 'orderSell',
  },
  checkQuote(){
    console.log('checkin those quotes');
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

    let newOrder = new Order(buyData);
    newOrder.set('quotes', this.quotes);
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
  orderSell: function(event) {
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
    buyData['buy'] = false;

    const newOrder = new Order(buyData);
    newOrder.set('quotes', this.quotes);

    console.log(newOrder);

    if (newOrder.isValid()) {
      console.log('IS VALID');
      this.model.add(newOrder);
      this.updateStatusMessageWith(`New order added for ${newOrder.get('symbol')}`);
    } else {
      console.log('FAIL');
      this.updateStatusMessageFrom(newOrder.validationError);
    }
  },
  cancelOrder(order) {
    order.remove();
    order.model.destroy();
  },
  updateStatusMessageFrom: function(messageHash) {
    const statusMessagesEl = this.$('.form-errors');
    statusMessagesEl.empty();
    _.each(messageHash, (messageType) => {
      messageType.forEach((message) => {
        statusMessagesEl.append(`<li>${message}</li>`);
      })
    });
    statusMessagesEl.show();
  },
  updateStatusMessageWith: function(message) {
    const statusMessagesEl = this.$('.form-errors');
    statusMessagesEl.empty();
    statusMessagesEl.append(`<li>${message}</li>`);
    statusMessagesEl.show();
  }
});

export default OrderListView;
