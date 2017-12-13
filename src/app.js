import 'foundation-sites/dist/foundation.css';
import 'css/app.css';
import _ from 'underscore';
import $ from 'jquery';

// models
import Simulator from 'models/simulator';
//collections
import QuoteList from 'collections/quote_list';
//views
import QuoteView from './views/quote_view';
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


// SIMULATOR START //
  simulator.start();
});
