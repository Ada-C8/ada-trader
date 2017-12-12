import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';


import Simulator from 'models/simulator';
import Quote from 'models/quote';
import QuoteList from 'collections/quote_list';
import QuoteListView from './views/quote_list_view';
import QuoteView from './views/quote_view';


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

const quoteList = new QuoteList();

$(document).ready(function() {
  const quotes = new QuoteList(quoteData);

  const quoteListView = new QuoteListView({
    model: quoteList,
    template: _.template($('#quote-template').html()),
    el: '.quotes-list-container'
  });

  quoteData.forEach(function(quote) {
    quoteList.add(new Quote({symbol: quote.symbol,
    price: quote.price}))
  });

  const simulator = new Simulator({
    quotes: quotes,
  });



  simulator.start();
});
