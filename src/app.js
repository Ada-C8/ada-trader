// CSS
import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

// Vendor Modules
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';


import Simulator from './models/simulator';
import Quote from './models/quote';
import QuoteList from './collections/quote_list';
import QuoteView from './views/quote_view';
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

let quoteTemplate;

$(document).ready(function() {
  // quoteTemplate
  quoteTemplate = _.template($('#quote-template').html());

  const quotes = new QuoteList(quoteData);
  const simulator = new Simulator({
    quotes: quotes,
  });

  simulator.start();

  const quoteListView = new QuoteListView ({
    el: '#quotes-container',
    model: quotes,
    template: quoteTemplate,
  });

  quoteListView.render();
});
