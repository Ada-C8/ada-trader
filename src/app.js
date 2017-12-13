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

  simulator.start();

  const quoteListView = new QuoteListView({
    el: 'main',
    model: quotes,
    template: quoteTemplate,
  });

  quoteListView.render();
});
