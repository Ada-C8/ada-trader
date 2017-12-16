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
      this.listenTo(this.quoteList, 'quoteChanged', this.quoteCheck);
      this.$('#orders').append(orderView.render().$el);
    });
    return this;
  },
  events: {
    'click #order-form .btn-buy': 'orderBuy',
    'click #order-form .btn-sell': 'orderSell',
  },
  quoteCheck(){
    let orderListView = this;
    this.model.models.forEach(function(order){
      let currentPrice = order.attributes.quotes.models.filter(quote => (quote.attributes.symbol === order.attributes.symbol))[0].attributes.price;
      let target = order.attributes.targetPrice;

      if (order.attributes.buy && currentPrice <= target) {
        orderListView.quoteList.quoteView.forEach(function(quoteView){
          if (quoteView.model.attributes.symbol === order.attributes.symbol) {
            quoteView.buyStock();
            order.destroy();
          }
        });
      }
      if (!order.attributes.buy && currentPrice >= target) {
        orderListView.quoteList.quoteView.forEach(function(quoteView){
          if (quoteView.model.attributes.symbol === order.attributes.symbol) {
            quoteView.sellStock();
            order.destroy();
          }
        });
      }
    });
  },
  orderBuy: function(event) {
    event.preventDefault();
    const buyData = {};
    buyData['symbol'] = this.$('#order-form-symbols').val();
    let val = $(`#targetPrice`).val();
    buyData['targetPrice'] = parseInt(val);
    buyData['buy'] = true;

    let newOrder = new Order(buyData);
    newOrder.set('quotes', this.quotes);
    if (newOrder.isValid()) {
      this.model.add(newOrder);
      this.updateStatusMessageWith(`New order added for ${newOrder.get('symbol')}`);
      this.$el.find('form').trigger('reset');
    } else {
      this.updateStatusMessageFrom(newOrder.validationError);
    }
  },
  orderSell: function(event) {
    event.preventDefault();
    const buyData = {};

    buyData['symbol'] = this.$('#order-form-symbols').val();
    let val = $(`#targetPrice`).val();
    buyData['targetPrice'] = parseInt(val);
    buyData['buy'] = false;

    const newOrder = new Order(buyData);
    newOrder.set('quotes', this.quotes);

    if (newOrder.isValid()) {
      this.model.add(newOrder);
      this.updateStatusMessageWith(`New order added for ${newOrder.get('symbol')}`);
      this.$el.find('form').trigger('reset');
    } else {
      this.updateStatusMessageFrom(newOrder.validationError);
    }
  },
  cancelOrder(orderView) {
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
  },
  updateStatusMessageWith: function(message) {
    const statusMessagesEl = this.$('.form-errors');
    statusMessagesEl.empty();
    statusMessagesEl.append(`<li>${message}</li>`);
  }
});

export default OrderListView;
