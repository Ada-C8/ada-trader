import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

import Simulator from 'models/simulator';
import QuoteList from 'collections/quote_list';
import QuoteListView from './views/quote_list_view';
import TradeHistoryView from './views/trade_history_view';

let quoteTemplate;
let tradeTemplate;

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
  const simulator = new Simulator({
    quotes: quotes,
  });
  let bus = {};
  bus = _.extend(bus, Backbone.Events)

  simulator.start();

  quoteTemplate = _.template($('#quote-template').html());
  tradeTemplate = _.template($('#trade-template').html());


  const quoteListView = new QuoteListView({
    el: '.quotes-list-container',
    model: quotes,
    bus: bus,
    template: quoteTemplate,
  });

  quoteListView.render();

  const tradeHistoryView = new TradeHistoryView({
    el: '.trades-list-container',
    bus: bus,
    template: tradeTemplate,
  });

});
