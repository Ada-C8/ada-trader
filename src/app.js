import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

import Simulator from 'models/simulator';
import QuoteList from 'collections/quote_list';

import QuoteListView from './views/quote_list_view';

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

const quotes = new QuoteList(quoteData);

$(document).ready(function() {
  const simulator = new Simulator({
    quotes: quotes,
  });

  simulator.start();

  let bus = {};
  bus = _.extend(bus, Backbone.Events);

  const quoteListView = new QuoteListView({
    model: quotes,
    bus: bus,
    template: _.template($('#quote-template').html()),
    tradeTemplate: _.template($('#trade-template').html()),
    el: '#quotes-container',
  });

  quoteListView.render();
});
