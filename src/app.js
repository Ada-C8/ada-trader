import Backbone from 'backbone';

import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';

import Simulator from 'models/simulator';
import Quote from './models/quote';
import QuoteList from './collections/quote_list';
import QuoteView from './views/quote_view';
import QuoteListView from './views/quote_list_view';
import TradeHistoryView from './views/trade_history_view';
import OpenOrdersView from './views/open_orders_view';

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


const quoteList = new QuoteList(quoteData);
let quoteTemplate;
let tradeTemplate;
let orderTemplate;

$(document).ready( () => {

  let bus = {}; //can trigger/subscribe to BB events
  bus = _.extend(bus, Backbone.Events);
  console.log("bus is " + bus);

  quoteTemplate = _.template($('#quote-template').html());
  tradeTemplate = _.template($('#trade-template').html());
  orderTemplate = _.template($('#order-template').html());

  const quotes = new QuoteList(quoteData);
  const simulator = new Simulator({
    quotes: quotes,
  });

  const quoteListView = new QuoteListView({
    el: '#quotes-container',
    model: quoteList,
    template: quoteTemplate,
    bus: bus,
  });

  const tradeHistoryView = new TradeHistoryView({
    bus: bus,
    template: tradeTemplate,
    el: '.trades'
  });

  const openOrdersView = new OpenOrdersView({
    bus: bus,
    template: orderTemplate,
    el: '.orders'
  });

  openOrdersView.render();

  tradeHistoryView.render();

  quoteListView.render();

  simulator.start();


});



// const tradeHistoryView = new TradeHistoryView({
//   el: '#trades-container',
//   model: quoteList,
//   template: tradeTemplate,
//   bus: bus,
// });
