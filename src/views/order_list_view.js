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
    this.quoteList = params.symbols
    this.bus = params.bus;
    console.log(this.bus);
    this.listenTo(this.model, 'update', this.render);
    this.orderForm(params.symbols.models);

  },

  render() {
    this.$('#orders').empty();
    console.log(this.model);
    this.model.each((order) => {
      const orderView = new OrderView({
        model: order,
        template: this.template,
        tagName: 'li',
        className: 'order',
        bus: this.bus,
      });
      // this.listenTo(taskView, 'editMe', this.editTask)
      this.$('#orders').append(orderView.render().$el);
    });
    return this;
  },
  orderForm(symbol_names) {
    symbol_names.forEach( (symbol_name) => {
      $('select').append(`<option>${symbol_name.get('symbol')}</option>`)
    });
  },
  events: {
    'click button.btn-buy': 'buyOrder',
    'click button.btn-sell': 'sellOrder'
  },
  buyOrder: function(event) {
    event.preventDefault();
    const orderData = {};
    orderData['symbol'] = this.$(`[name=symbol]`).val();
    orderData['targetPrice'] = parseFloat(this.$(`[name=price-target]`).val());
    orderData['buy'] = true;
    const searchElem = this.quoteList.findWhere({symbol: orderData['symbol']});
    console.log(searchElem);
    orderData['activeQuote'] = searchElem;
    console.log(this.bus);
    orderData['bus'] = this.bus;
    const newOrder = new Order(orderData);
    console.log(newOrder);
    if (newOrder.isValid()) {
      this.model.add(newOrder);
      console.log(this.model);
    } else {
      newOrder.destroy();
      console.log(`IN THE ELSE ${newOrder.validationError}`);
      this.updateStatusMessageFrom(newOrder.validationError);
    }
},
sellOrder: function(event) {
  event.preventDefault();
  const orderData = {};
  orderData['symbol'] = this.$(`[name=symbol]`).val();
  orderData['targetPrice'] = parseInt(this.$(`[name=price-target]`).val());
  orderData['buy'] = false;
  orderData['bus'] = this.bus;
  const searchElem = this.quoteList.findWhere({symbol: orderData['symbol']})
  orderData['activeQuote'] = searchElem
  const newOrder = new Order(orderData);
  if (newOrder.isValid()) {
    this.model.add(newOrder);
  } else {
    this.updateStatusMessageFrom(newOrder.validationError);
  }
},
updateStatusMessageFrom: function(messageHash) {
  const statusMessagesEl = this.$('.form-errors');
  statusMessagesEl.empty();
  _.each(messageHash, (messageType) => {
    messageType.forEach((message) => {
      statusMessagesEl.append(`<h3>${message}</h3>`);
    })
  });
  statusMessagesEl.show();
},

});

export default OrderListView;
