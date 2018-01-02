import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

import Simulator from 'models/simulator';
import QuoteList from 'collections/quote_list';
import QuoteListView from 'views/quote_list_view';
import OrderList from 'collections/order_list';
import OrderListView from 'views/order_list_view';
import TradeListView from 'views/trade_list_view';
import OrderEntryView from 'views/order_entry_view';

const eventBus = _.extend({}, Backbone.Events);

const quoteData = [
  {
    symbol: 'HUMOR',
    price: 88.50,
    bus: eventBus,
  },
  {
    symbol: 'CLOTH',
    price: 81.70,
    bus: eventBus,
  },
  {
    symbol: 'HABIT',
    price: 98.00,
    bus: eventBus,
  },
  {
    symbol: 'SUPER',
    price: 83.10,
    bus: eventBus,
  },
];


const quotes = new QuoteList(quoteData);
const orders = new OrderList();

$(document).ready(function() {
  const quoteListView = new QuoteListView({
    model: quotes,
    template: _.template($('#quote-template').html()),
    el: '#quotes-container',
  });

  const tradeListView = new TradeListView({
    model: quotes,
    template: _.template($('#trade-template').html()),
    bus: eventBus,
    el: '#trades-container',
  });

  const orderListView = new OrderListView({
    model: orders,
    template: _.template($('#order-template').html()),
    el: '.orders-list-container'
  });

  const orderEntryView = new OrderEntryView({
    model: {quotes, orders}, // shorthand notation
    template: _.template($('#order-list-option-template').html()),
    el: '.order-entry-form'
  });

  const simulator = new Simulator({
    quotes: quotes,
  });

  simulator.start();

  quoteListView.render();
  orderEntryView.renderForm();
});
