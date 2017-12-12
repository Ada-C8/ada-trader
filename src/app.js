import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';

import Quote from './models/quote';
import Simulator from 'models/simulator';
import QuoteList from 'collections/quote_list';
import QuoteView from './views/quote_view';

let quoteTemplate;

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

const renderQuoteList = function renderQuoteList(quotes) {
  const $quotes = $('#quotes');
  $quotes.empty();

  quotes.forEach((quote) =>{
    console.log('In renderQuoteList');

    //make new QuoteView
    const quoteView = new QuoteView({
      model: quote,
      template: _.template($('#quote-template').html()),
      tagName: 'li',
      className: 'quote',
    });

    $quotes.append(quoteView.render().$el);
    console.log('In renderQuoteList after');
  });
};

$(document).ready(function() {
  quoteTemplate = _.template($('#quote-template').html());

  const quotes = new QuoteList(quoteData);
  const simulator = new Simulator({
    quotes: quotes,
  });

  // quotes.on('update', renderQuoteList, quotes);
  renderQuoteList(quotes);
  simulator.start();

});
