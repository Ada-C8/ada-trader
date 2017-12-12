import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

import Simulator from 'models/simulator';
import QuoteList from 'collections/quote_list';
import QuoteView from 'views/quote_view';
import QuoteListView from 'views/quote_list_view';

let quoteViewTemplate;
// let quoteViewListTemplate;

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
  _.extend(bus, Backbone.Events);

  quoteViewTemplate = _.template($('#quote-template').html());
  const quotes = new QuoteList(quoteData);
  const simulator = new Simulator({
    quotes: quotes,
    bus: bus,
  });
  const quotesView = new QuoteListView({
    model: quotes,
    el: 'main',
    template: quoteViewTemplate,
    bus: bus,
  });

  simulator.start();

  quotesView.render();
});
