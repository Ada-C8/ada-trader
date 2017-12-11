import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';


import Simulator from 'models/simulator';
import QuoteList from 'collections/quote_list';
import TradeList from 'collections/trade_list';


import QuoteView from './views/quote_view';
import QuoteListView from './views/quote_list_view';

import TradeView from './views/trade_view';
import TradeListView from './views/trade_list_view';

const quoteList = new QuoteList();
const trades = new TradeList();

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
    model: quotes,
    template: _.template($('#quote-template').html()),
    el: 'main'
  });
  quoteListView.render();

  const tradeListView = new TradeListView({
    model: trades,
    template: _.template($('#trade-template').html()),
    el: 'main'
  });
  tradeListView.render();



  simulator.start();
});
