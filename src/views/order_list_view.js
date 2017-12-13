import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';

import Quote from '../models/quote';
import Order from '../models/order';
import OrderView from '../views/order_view';


import QuoteList from '../collections/quote_list';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'update', this.render);
    this.orderForm(params.symbols.models);
  },

  render() {
    this.$('#orders').empty();
    this.model.each((order) => {
      const orderView = new OrderView({
        model: order,
        template: this.template,
        tagName: 'li',
        className: 'order',
      });
      // this.listenTo(taskView, 'editMe', this.editTask)
      this.$('#orders').append(orderView.render().$el);
    });
    return this;
  },
  orderForm(symbol_names) {
    symbol_names.forEach( (symbol_name) => {
      console.log(symbol_name.get('symbol'));
      $('select').append(`<option>${symbol_name.get('symbol')}</option>`)
    });
  },
  events: {
    'click button.btn-buy': 'buyOrder',
    'click button.btn-sell': 'sellOrder'

    // 'click #order-entry-form': 'addOrder'
  },
  buyOrder: function(event) {
    event.preventDefault();
    const orderData = {};
    orderData['symbol'] = this.$(`[name=symbol]`).val()
    orderData['targetPrice'] = parseInt(this.$(`[name=price-target]`).val());
    orderData['buy'] = 'true';
    console.log(orderData);
    const newOrder = new Order(orderData);
    if (newOrder.isValid()) {
      this.model.add(newOrder);
      //   this.updateStatusMessageWith(`New task added: ${newTask.get('task_name')}`);
      // } else {
      //   this.updateStatusMessageFrom(newTask.validationError);
      // }
    }
  },
  sellOrder: function(event) {
    event.preventDefault();
    const orderData = {};
    orderData['symbol'] = this.$(`[name=symbol]`).val();
    orderData['targetPrice'] = parseInt(this.$(`[name=price-target]`).val());
    orderData['buy'] = 'false';
    console.log(orderData);
    const newOrder = new Order(orderData);
    if (newOrder.isValid()) {
      this.model.add(newOrder);
    }
  }
});

export default OrderListView;
