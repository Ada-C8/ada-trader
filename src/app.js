import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

import Simulator from 'models/simulator';
import QuoteList from 'collections/quote_list';
import OpenOrderList from 'collections/open_order_list';

import Quote from './models/quote';
import QuoteView from './views/quote_view';
import QuoteListView from './views/quote_list_view';
import TradeListView from './views/trade_list_view';
import OpenOrder from './models/open_order';
import OpenOrderView from './views/open_order_view';
import OpenOrderListView from './views/open_order_list_view';




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

// const quoteList = new QuoteList();
const openOrderList = new OpenOrderList();

let quoteTemplate;
let tradeTemplate;
let orderTemplate;

$(document).ready(function() {
  let bus = {};
  // need to import backbone
  bus = _.extend(bus, Backbone.Events);
  quoteTemplate = _.template($('#quote-template').html());
  orderTemplate = _.template($('#order-template').html());


  tradeTemplate = _.template($('#trade-template').html());

  const quotes = new QuoteList(quoteData);
  const simulator = new Simulator({
    quotes: quotes,
  });

  // Quotelistview will encompass the main tag
  const quoteListView = new QuoteListView({
    el: 'main',
    model: quotes,
    template: quoteTemplate,
    bus: bus,
  });

  // TradelistView will encompass the main tag
  const tradelistView = new TradeListView({
    el: '#trades-container',
    bus: bus,
    // model: quotes,
    template: tradeTemplate,
  });

  // OpenOrderListview will encompass the orderWorkspace div
  const openOrderListView = new OpenOrderListView({
    el: '#order-workspace',
    model: openOrderList,
    template: orderTemplate,
    bus: bus,
  });

  quoteListView.render();

  // wave 3
  // any time the stock "changes" change event on model
  simulator.start();
});
