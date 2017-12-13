import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';

import OrderView from '../views/order_view';
import Order from '../models/order'

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'update', this.render);
    this.listenTo(this.model.models, 'update', this.render);

    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this, 'change', this.render);

  },
  render() {
    this.$('#orders').empty();
    this.model.each((order) => {
      const orderView = new OrderView({
        model: order,
        template: this.template,
        className: 'order',
      });
      this.listenTo(orderView, 'cancelMe', this.cancelOrder);
      this.listenTo(this.quoteList, 'quoteChanged', this.aChange);
      this.$('#orders').append(orderView.render().$el);
    });
    return this;
  },
  events: {
    'click #order-form .btn-buy': 'orderBuy',
    'click #order-form .btn-sell': 'orderSell',
  },
  aChange(){
    // this.trigger('quoteChanged', this);
    // console.log('in the order list view change')
    let orderListView = this;
    this.model.models.forEach(function(order){
      // console.log(order.attributes.symbol);
      // console.log(order.attributes.targetPrice);

      let currentPrice = order.attributes.quotes.models.filter(quote => (quote.attributes.symbol === order.attributes.symbol))[0].attributes.price;

      let target = order.attributes.targetPrice;
      // console.log(`current: ${currentPrice}, target: ${target}`)
      // console.log(order);
      // console.log(order.attributes.symbol);
      if (currentPrice <= target) {
        // console.log('current is less than target, i should buy');
        // return false
        // console.log(orderListView.quoteList);
        // orderListView.quoteList.quoteView.buyStock();
        orderListView.quoteList.quoteView.forEach(function(quoteView){
          if (quoteView.model.attributes.symbol === order.attributes.symbol) {
            quoteView.buyStock();
            // console.log(order);
            order.destroy();

            // let toBeDestroyed = orderListView.quoteView
            // orderListView.cancelOrder(order);
          }
        });

      }

    });
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
    // newOrder.set('listView', OrderListView);


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
  cancelOrder(orderView) {
    console.log('inside the cancel');
    orderView.remove();
    orderView.model.destroy();
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
