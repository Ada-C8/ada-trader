import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';

import Simulator from 'models/simulator';
import QuoteList from 'collections/quote_list';
import QuoteView from './views/quote_view';
import QuoteListView from './views/quote_list_view';
import TradeHistoryView from './views/trade_history_view';
import OrderView from './views/order_view';
import OrderListView from './views/order_list_view';
import OrderList from 'collections/order_list';

let quoteTemplate;
let tradeTemplate;
let orderTemplate;

const quoteData = [
  {
    symbol: 'HUMOR',
    price: 88.50,
  },
  {
    symbol: 'CLOTH',
    price: 81.70,
  },
  {
    symbol: 'HABIT',
    price: 98.00,
  },
  {
    symbol: 'SUPER',
    price: 83.10,
  },
];

$(document).ready(function() {
  let bus = {};
  bus = _.extend(bus, Backbone.Events);
  tradeTemplate = _.template($('#trade-template').html());
  quoteTemplate = _.template($('#quote-template').html());
  orderTemplate = _.template($('#order-template').html());
  const quotes = new QuoteList(quoteData);

  const orders = new OrderList(); // not sure if this is right...
  const simulator = new Simulator({
    quotes: quotes,
  });
  simulator.start();

  const tradeHistoryView = new TradeHistoryView({
    bus: bus,
    template: tradeTemplate,
    el: $('#trades'),
  });

  const quoteListView = new QuoteListView({
    model: quotes,
    template: quoteTemplate,
    el: '#quotes-container',
    bus: bus,
  });
  quoteListView.render();

  const orderListView = new OrderListView({
    quotes: quotes,
    model: orders,
    template: orderTemplate,
    el: '#order-workspace', // or orders?
    bus: bus,
  });

  orderListView.render();
});
