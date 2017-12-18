import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';

import Simulator from 'models/simulator';
import QuoteList from 'collections/quote_list';
import QuoteListView from 'views/quote_list_view';

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

  const quotes = new QuoteList(quoteData);
  const simulator = new Simulator({
    quotes: quotes,
  });
  const quoteTemp = _.template($('#quote-template').html());
  const tradeTemp = _.template($('#trade-template').html());

  //create new quote view obj
  const quoteListView = new QuoteListView({
    model: quotes,
    quoteTemplate: quoteTemp,
    tradeTemplate: tradeTemp,
    el: 'main',
    bus: bus,
  });

  quoteListView.render();

  simulator.start();

});
