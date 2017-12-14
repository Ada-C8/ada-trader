import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';


import Simulator from 'models/simulator';
import QuoteList from 'collections/quote_list';
import Quote from 'models/quote';
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
// const quoteList = new QuoteList();
// let quoteTemplate;

$(document).ready(function() {
  // quoteTemplate = _.template($('#quote-template').html());

  const quotes = new QuoteList(quoteData);
  const simulator = new Simulator({
    quotes: quotes,
  });

  const quoteListView = new QuoteListView({
    model: quotes,
    template: _.template($('#quote-template').html()),
    el: 'main'
  });
  // console.log(quoteListView);


  quoteListView.render();
  simulator.start();
});
