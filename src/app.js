import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

import Quote from './models/quote';
import Simulator from 'models/simulator';
import QuoteList from 'collections/quote_list';
import QuoteView from './views/quote_view';
import QuoteListView from './views/quote_list_view';
import TradeHistoryView from './views/trade_history_view';
import OrdersView from './views/orders_view';

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

  console.log('about to see all quotes?');
  const allSymbolsArray = quotes.allSymbols();

  const ordersView = new OrdersView({
    el: '#order-workspace',
    bus: bus,
    template: orderTemplate,
    allSymbols: allSymbolsArray,
  })

  ordersView.render();
  quoteListView.render();
  // quotes.on('update', renderQuoteList, quotes);
  // renderQuoteList(quotes);
  simulator.start();

});





// const renderQuoteList = function renderQuoteList(quotes) {
//   const $quotes = $('#quotes');
//   $quotes.empty();
//
//   quotes.forEach((quote) =>{
//     console.log('In renderQuoteList');
//
//     //make new QuoteView
//     const quoteView = new QuoteView({
//       model: quote,
//       template: _.template($('#quote-template').html()),
//       tagName: 'li',
//       className: 'quote',
//     });
//
//     $quotes.append(quoteView.render().$el);
//     console.log('In renderQuoteList after');
//   });
// };
