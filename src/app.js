import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';
//models
import Simulator from 'models/simulator';
//collections
import TradeList from 'collections/trade_list';
import QuoteList from 'collections/quote_list';
//views
import QuoteListView from 'views/quote_list_view';
import TradeListView from 'views/trade_list_view';

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

const tradeData = [
  {
    symbol: 'ABCD',
    buy: true,
    price: 10.02,
  },
  {
    symbol: 'XYZ',
    buy: false,
    price: 15.02,
  },
]

$(document).ready(function() {
  const quotes = new QuoteList(quoteData);
  const simulator = new Simulator({
    quotes: quotes,
  });

  const quoteListView = new QuoteListView({
    model: quotes,
    template: _.template($('#quote-template').html()),
    el: 'main',
  });
  quoteListView.render();

  const tradeList = new TradeList(tradeData);
  const tradeListView = new TradeListView({
    model: tradeList,
    template: _.template($('#trade-template').html()),
    el: 'main',
  });
  tradeListView.render();

  simulator.start();
});
