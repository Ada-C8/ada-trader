import Backbone from 'backbone';
import _ from 'underscore';

import Quote from '../models/quote';
import Order from '../models/order';

import OrderView from '../views/order_view';
import QuoteView from '../views/quote_view';

const OrderEntryView = Backbone.View.extend({
  initialize(params){
    this.template = params.template;
    this.bus = params.bus;
  },

  events: {
    'click button.btn-buy': 'buy',
    'click button.btn-sell': 'sell'
  },
  buy(event) {
    event.preventDefault();
    console.log('test1');
    let orderData = {
      buy: true
    };

    orderData.symbol = this.$('#orderForm select').val();
    let targetPrice = parseFloat(this.$('#target-price').val());
    console.log('the target price is ' + targetPrice);
    orderData.targetPrice = targetPrice;

    let order = new Order(orderData);
    if (!order.isValid()) {
      order.destroy();
      this.updateStatusMessage(order.validationError);
      return;
    }

    this.bus.trigger('newOrder', order);
  },

  sell(event) {
    event.preventDefault();
    console.log('selltest');
    let orderData = {
      buy: false
    };

    orderData.symbol = this.$('#orderForm select').val();
    orderData.targetPrice = parseFloat(this.$('#target-price').val());


    let order = new Order(orderData);
    this.bus.trigger('newOrder', order);
  },
});
export default OrderEntryView;
