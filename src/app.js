// CSS
import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

// Modules
import $ from 'jquery';
import _ from 'underscore';

// Imports
import Simulator from './models/simulator';
import QuoteList from './collections/quote_list';
// import Trade from './models/trade';

import QuoteView from './views/quote_view';
import QuoteListView from './views/quote_list_view';

// -------------------------------------------------------

// Given quotes
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

// Got quote names & prices into separate arrays
const names = quoteData.map(info => info.symbol);
const prices = quoteData.map(info => info.price);

// Define some variables
let quoteTemplate;

// -------------------------------------------------------

// jQuery Ready
$(document).ready(function() {
  quoteTemplate = _.template($('#quote-template').html());
  // tradeTemplate = _.template($('#trade-template').html());

  const quotes = new QuoteList(quoteData);
  const simulator = new Simulator({
    quotes: quotes,
  });

  // Populate the form with options and prices
  let selectBox = $('.order-entry-form form select[name="symbol"]');
  for (name of names) {
    selectBox.append(`<option value="${name}">${name}</option>`);
  }

  simulator.start();

  const quoteListView = new QuoteListView({
    el: 'main',
    model: quotes,
    template: quoteTemplate,
  });

  quoteListView.render();
});
