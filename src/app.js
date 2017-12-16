// CSS
import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

// Vendor Modules
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

import Simulator from './models/simulator';
import Quote from './models/quote';
import QuoteList from './collections/quote_list';
import QuoteView from './views/quote_view';
import QuoteListView from './views/quote_list_view';
import TradesView from './views/trades_view';
import Order from './models/order';
import OrderList from './collections/order_list';
import OrderView  from './views/order_view';
import OrderListView  from './views/order_list_view';

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

const symbolData = quoteData.map( x => x.symbol )

let quoteTemplate;
let tradeTemplate;
let orderTemplate

$(document).ready(function() {
  // set up bus so that is can listen and respond to events
  let bus = {};
  bus = _.extend(bus, Backbone.Events);

  // Underscore templates
  quoteTemplate = _.template($('#quote-template').html());
  tradeTemplate = _.template($('#trade-template').html());
  orderTemplate = _.template($('#order-template').html());

  // new quoteList instance
  const quotes = new QuoteList(quoteData);

  // makes a quote list view and then renders it
  const quoteListView = new QuoteListView ({
    el: '#quotes-container',
    model: quotes,
    template: quoteTemplate,
    bus: bus,
  });

  quoteListView.render();

  // new orderList instance
  const orders = new OrderList();

  // makes a quote list view and then renders it
  const orderListView = new OrderListView({
    el: '#order-workspace',
    model: orders,
    template: orderTemplate,
    bus: bus,
    symbols: symbolData,
  });

  orderListView.render();

  // Creates an instance of TradesView that it will show all of the trade histories
  // include the bus so it can listen and emit messages with the other views in the app
  const tradesView = new TradesView ({
    el: '#trades',
    template: tradeTemplate,
    bus: bus,
  });

  // new simulator, will start it updating the quotes at second intervals
  const simulator = new Simulator({
    quotes: quotes,
  });
  simulator.start();
});
