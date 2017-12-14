import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

import Simulator from 'models/simulator';
import QuoteList from 'collections/quote_list';
import QuoteListView from './views/quote_list_view';
import TradeHistoryView from './views/trade_history_view';
import OrderList from './collections/order_list';
import OrderListView from './views/order_list_view';

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
  const quotes = new QuoteList(quoteData);
  const orders = new OrderList();
  const simulator = new Simulator({
    quotes: quotes,
  });
  let bus = {};
  bus = _.extend(bus, Backbone.Events)

  simulator.start();

  quoteTemplate = _.template($('#quote-template').html());
  tradeTemplate = _.template($('#trade-template').html());
  orderTemplate = _.template($('#order-template').html());


  const quoteListView = new QuoteListView({
    el: '#quotes-container',
    model: quotes,
    bus: bus,
    template: quoteTemplate,
  });

  quoteListView.render();

  const tradeHistoryView = new TradeHistoryView({
    el: '#trades-container',
    bus: bus,
    template: tradeTemplate,
  });

  const orderListView = new OrderListView({
    el: '#order-workspace',
    model: orders,
    quotes: quotes,
    bus: bus,
    template: orderTemplate,
  });

  orderListView.render();

});
