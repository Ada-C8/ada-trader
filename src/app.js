import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';

import Simulator from 'models/simulator';
import Quote from 'models/quote';
import QuoteList from 'collections/quote_list';
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

// define templates
let quoteTemplate;

$(document).ready(function() {
  // templates
  quoteTemplate = _.template($('#quote-template').html());

  // create new quote list
  const quotes = new QuoteList(quoteData);
  for (let quote of quoteData) {
    quotes.add(new Quote(quote));
  };

  //create new quote list view
  const quoteListView = new QuoteListView({
    el: '#quotes-container',
    model: quotes,
    template: quoteTemplate,
  });

  quoteListView.render();

  // run the simulator
  const simulator = new Simulator({
    quotes: quotes,
  });

  simulator.start();



});
