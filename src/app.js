// CSS
import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

// Modules
import $ from 'jquery';
import _ from 'underscore';

// Imports
import Simulator from './models/simulator';
import QuoteList from './collections/quote_list';
import OrderList from './collections/order_list';

import QuoteView from './views/quote_view';
import QuoteListView from './views/quote_list_view';
import TradeView from './views/trade_view';
import OrderView from './views/order_view';
import OrderListView from './views/order_list_view';

// -------------------------------------------------------

// Given quotes
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

// Got quote names & prices into separate arrays
const names = quoteData.map(info => info.symbol);
const prices = quoteData.map(info => info.price);

// Define some variables
let quoteTemplate;
let tradeTemplate;
let orderTemplate;

// -------------------------------------------------------

// jQuery Ready
$(document).ready(function() {

  // Event Bus
  let bus = {};
  bus = _.extend(bus, Backbone.Events);

  // Templates
  quoteTemplate = _.template($('#quote-template').html());
  tradeTemplate = _.template($('#trade-template').html());
  orderTemplate = _.template($('#order-template').html());

  // Constants
  const quotes = new QuoteList(quoteData);
  const simulator = new Simulator({
    quotes: quotes,
  });
  const orders = new OrderList();

  // Populate the form with options and prices
  let selectBox = $('.order-entry-form form select[name="symbol"]');
  for (name of names) {
    selectBox.append(`<option value="${name}">${name}</option>`);
  }

  // Render quote list view
  const quoteListView = new QuoteListView({
    el: $('#quotes-container'),
    model: quotes,
    template: quoteTemplate,
    bus: bus,
  });

  // Render trade history view
  const tradeView = new TradeView({
    el: $('#trades-container'),
    template: tradeTemplate,
    bus: bus,
  })

  // Render order list view
  const orderListView = new OrderListView({
    el: $('#order-workspace'),
    model: orders,
    template: orderTemplate,
    quoteList: quotes,
  });

  quoteListView.render();
  orderListView.render();
  simulator.start();

});
