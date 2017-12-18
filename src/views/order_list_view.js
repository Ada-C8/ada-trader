import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';

import Order from '../models/order';
import OrderView from '../views/order_view';

import Quote from '../models/quote';
import QuoteList from '../collections/quote_list';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.quoteList = params.symbols
    this.bus = params.bus;
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
        bus: this.bus,
      });
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
    orderData['activeQuote'] = searchElem;
    orderData['bus'] = this.bus;
    orderData['symbolList'] = this.quoteList.map(quote => quote.get('symbol'));
    const newOrder = new Order(orderData);
    if (newOrder.isValid()) {
      this.model.add(newOrder);
    } else {
      newOrder.destroy();
      this.showMessage(newOrder.validationError);
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
    orderData['symbolList'] = this.quoteList.map(quote => quote.get('symbol'));
    const newOrder = new Order(orderData);
    if (newOrder.isValid()) {
      this.model.add(newOrder);
    } else {
      this.showMessage(newOrder.validationError);
    }
  },
  showMessage: function(messageObj) {
    const messageArea = this.$('.form-errors');
    messageArea.empty();
    _.each(messageObj, (messages) => {
      messages.forEach((text) => {
        messageArea.append(`<h3>${text}</h3>`);
      })
    });
    messageArea.show();
  },

});

export default OrderListView;
