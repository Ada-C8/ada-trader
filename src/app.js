import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';

import Simulator from 'models/simulator';
import Quote from 'models/quote';
import QuoteList from 'collections/quote_list';
import OrderList from 'collections/order_list';
import QuoteView from 'views/quote_view';
import QuoteListView from 'views/quote_list_view';
import OrderListView from 'views/order_list_view';
import TradesView from 'views/trades_view';

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

// define templates
let quoteTemplate;
let tradeTemplate;
let orderTemplate;

$(document).ready(function() {
  // templates
  quoteTemplate = _.template($('#quote-template').html());
  tradeTemplate = _.template($('#trade-template').html());
  orderTemplate = _.template($('#order-template').html());

  // create new quote list
  const quotes = new QuoteList(quoteData);
  for (let quote of quoteData) {
    quotes.add(new Quote(quote));
  };

  // create new quote list view
  const quoteListView = new QuoteListView({
    el: '#quotes-container',
    model: quotes,
    template: quoteTemplate,
  });

  quoteListView.render();

  // run the simulator
  const simulator = new Simulator({
    quotes: quotes,
  });

  simulator.start();

  // create new trades view
  const tradesView = new TradesView({
    el: '#trades-container',
    template: tradeTemplate,
    tagName: 'li',
    className: 'trade',
    view: quoteListView,
  });

  // add options to select in order form
  for (let quote of quoteData) {
    console.log(quote);
    $('.order-entry-form select[name=symbol]').append(`<option>${quote.symbol}</option>`)
  };

  // create new empty order list
  const orders = new OrderList();

  // create new order list view
  const orderListView = new OrderListView({
    el: '#order-workspace',
    model: orders,
    template: orderTemplate,
  });

  orderListView.render();








});
