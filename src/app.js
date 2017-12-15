import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';

import Simulator from 'models/simulator';
import Quote from 'models/quote';
import QuoteList from 'collections/quote_list';
import QuoteView from 'views/quote_view';
import QuoteListView from 'views/quote_list_view';
import TradeList from 'collections/trade_list';
import TradeView from 'views/trade_view';
import TradeListView from 'views/trade_list_view';


// Create a bus
let bus = {};
bus = _.extend(bus, Backbone.Events);

// const quoteList = new QuoteList();
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

  const quoteListView = new QuoteListView({
    // setting model to quotes, not new QuoteListView- might run into problems later??
    model: quotes,
    bus: bus,
    template: _.template($('#quote-template').html()),
    tradeTemplate: _.template($('#trade-template').html()),
    el: '#quotes-container',
    tradeEl: '#trades',
  });

  quoteListView.render();

  const tradeList = new TradeList();
  const tradeListView = new TradeListView({
    model: tradeList,
    template: _.template($('#trade-template').html()),
    el: '#trades-container',
    bus: bus,
  })
 tradeListView.render();


  simulator.start();
});
