import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

import Quote from './models/quote';
import Simulator from 'models/simulator';
import QuoteList from 'collections/quote_list';
import Order from './models/order';
import OrderList from './collections/order_list';

import QuoteView from './views/quote_view';
import QuoteListView from './views/quote_list_view';
import TradeHistoryView from './views/trade_history_view';
import OrdersView from './views/order_list_view';

let quoteTemplate;
let tradeTemplate;
let orderTemplate;

const orderList = new OrderList();

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

  quoteTemplate = _.template($('#quote-template').html());
  tradeTemplate = _.template($('#trade-template').html());
  orderTemplate = _.template($('#order-template').html());

  const quotes = new QuoteList(quoteData);

  const simulator = new Simulator({
    quotes: quotes,
  });

  const quoteListView = new QuoteListView({
    el: 'main',
    model: quotes,
    template: quoteTemplate,
    bus: bus,
  });

  const tradeHistoryView = new TradeHistoryView({
    el: '#trades-container',
    bus: bus,
    template: tradeTemplate,
  })

  //get all symbols from quotes
  const allSymbolsArray = quotes.allSymbols();

  const ordersView = new OrdersView({
    el: '#order-workspace',
    model: orderList,
    bus: bus,
    template: orderTemplate,
    allSymbols: allSymbolsArray,
  })

  ordersView.render();
  quoteListView.render();

  simulator.start();
});
