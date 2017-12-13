import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

import Simulator from 'models/simulator';
import QuoteList from 'collections/quote_list';
import QuoteListView from 'views/quote_list_view';
import TradeList from 'collections/trade_list';
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

$(document).ready(function() {
  let eventBus = {};
  eventBus = _.extend(eventBus, Backbone.Events);
  const tradeList = new TradeList();
  const tradeListView = new TradeListView({
    model: tradeList,
    template: _.template($('#trade-template').html()),
    el: 'main',
    bus: eventBus,
  })
  tradeListView.render();

  const quotes = new QuoteList(quoteData);
  const simulator = new Simulator({
    quotes: quotes,
    bus: eventBus,
  });

  const quoteListView = new QuoteListView({
    model: quotes,
    template: _.template($('#quote-template').html()),
    el: 'main',
    bus: eventBus,
  });

  quoteListView.render();

  simulator.start();
});
