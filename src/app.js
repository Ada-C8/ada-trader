import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

import Simulator from 'models/simulator';

// import Quote from './models/quote'
import QuoteList from './collections/quote_list'

import QuoteListView from './views/quote_list_view'

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

$(document).ready(function() {
  const simulator = new Simulator({
    quotes: quoteList,
  });

  const quoteListView = new QuoteListView({
    model: quoteList,
    template: _.template($('#quote-template').html()),
    tradeTemplate: _.template($('#trade-template').html()),
    el: 'main',
  })

  quoteListView.render();

  simulator.start();
});

// wave 2: add and clone into a new collection?
