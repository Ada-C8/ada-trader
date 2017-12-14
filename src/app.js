import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';


import Simulator from 'models/simulator';
import Quote from 'models/quote';
import QuoteList from 'collections/quote_list';
import QuoteListView from './views/quote_list_view';
import QuoteView from './views/quote_view';
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

let bus = {};
bus = _.extend(bus, Backbone.Events);


$(document).ready(function() {
  const quotes = new QuoteList(quoteData);

  const quoteListView = new QuoteListView({
    model: quotes,
    template: _.template($('#quote-template').html()),
    el: '.quotes-list-container',
    bus: bus,
  });

  quoteListView.render();

  const tradeListView = new TradeListView({
    template: _.template($('#trade-template').html()),
    el: '.trades-list-container',
    bus: bus,
    hello: 'hullo',
  })
  tradeListView.render();

  const simulator = new Simulator({
    quotes: quotes,
  });

  simulator.start();
});
