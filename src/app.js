// Vendor Modules
import $ from 'jquery';
import _ from 'underscore';

// CSS
import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

// Models
import Quote from 'models/quote';
import Simulator from 'models/simulator';
import QuoteList from 'collections/quote_list';

// Views
import QuoteView from 'views/quote_view';
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

  console.log(quotes);
  const quoteListView = new QuoteListView({
    model: quotes,
    template: _.template($('#quote-template').html()),
    tradeTemplate: _.template($('#trade-template').html()),
    el: 'main',
  });
  //console.log('TEST');

  quoteListView.render();
  simulator.start();
});
