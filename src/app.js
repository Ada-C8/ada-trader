import 'foundation-sites/dist/foundation.css';
import 'css/app.css';
import _ from 'underscore';

import $ from 'jquery';

import Quote from './models/quote'
import QuoteView from './views/quote_view'
import Simulator from 'models/simulator';
import QuoteList from 'collections/quote_list';
import QuoteListView from './views/quote_list_view';
import Trade from './models/trade';
import TradeList from 'collections/quote_list';
import TradeListView from './views/trade_list_view';
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

const quoteList = new QuoteList();
const tradeList = new TradeList();
let quoteTemplate
let tradeTemplate

quoteData.forEach(function(datum) {
  quoteList.add(new Quote(datum))
});

$(document).ready(function() {
  quoteTemplate = _.template($('#quote-template').html());
  tradeTemplate = _.template($('#trade-template').html());


  let bus = {};
  bus = _.extend(bus, Backbone.Events)

  const simulator = new Simulator({
    quotes: quotes,
  });

  const quoteListView = new QuoteListView({
    el: 'main',
    model: quoteList,
    template: quoteTemplate,
    bus: bus,
  });
  quoteListView.render();
  const quotes = new QuoteList(quoteData);

  const tradeListView = new TradeListView({
    el: 'main',
    model: tradeList,
    template: tradeTemplate,
    bus: bus,
  });
  tradeListView.render();
  const trades = new TradeList();


  
  simulator.start();
});
