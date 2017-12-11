import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';

import Simulator from 'models/simulator';
import Quote from 'models/quote'
import QuoteView from 'views/quote_view'
import QuoteList from 'collections/quote_list';
import QuoteListView from 'views/quote_list_view'


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

const quoteList = new QuoteList(quoteData)

$(document).ready(function() {
  const quoteTemplate = _.template($('#quote-template').html());
  const quoteListView = new QuoteListView({
    model: quoteList,
    template: quoteTemplate,
    el: 'main'
  });

  console.log(quoteList);
  // const quotes = new QuoteList(quoteData);
  // const simulator = new Simulator({
  //   quotes: quotes,
  // });

  // simulator.start();
});
