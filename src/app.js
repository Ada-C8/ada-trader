import 'foundation-sites/dist/foundation.css';
import 'css/app.css';
import _ from 'underscore';
import $ from 'jquery';

import Simulator from 'models/simulator';
import QuoteList from 'collections/quote_list';
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

const quoteList = new QuoteList(quoteData);

$(document).ready(function() {
  const quotes = new QuoteList(quoteData);
  const simulator = new Simulator({
    quotes: quoteList,
  });

  const quoteListView = new QuoteListView({
   model: quoteList,
   template: _.template($('#quote-template').html()),
   el: '.quotes-list-container'
 });
 
  quoteListView.render();
  simulator.start();
});
