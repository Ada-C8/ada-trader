import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';

import Simulator from 'models/simulator';
import Quote from 'models/quote';
import QuoteList from 'collections/quote_list';

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

const renderList = (quoteList) => {
  const $quoteList = $();
  $quoteList.empty();

  quoteList.forEach((quote) => {
    const quoteView = new QuoteView({
      model: quote,
      template: _.template($('#quote-template').html()),
      tagName: 'li',
      className: 'quote',
    });
    $quoteList.append(quoteView.render().$el);
  });
};

let quoteTemplate;

$(document).ready(function() {
  const quotes = new QuoteList(quoteData);
  const simulator = new Simulator({
    quotes: quotes,
  });

  simulator.start();

  quoteTemplate = _.template($('#quote-template').html());

  const quoteListView = new QuoteListView ({
    model: quotes,
    template: quoteTemplate,
    el: 'main',
  });

  quoteListView.render();



// // render one quote
// const $quoteList = $('#quotes');
//
//   const quoteView = new QuoteView({
//     // el: 'ul',
//     model: quotes.at(0),
//     template: quoteTemplate,
//     tagName: 'li',
//     className: 'quote'
//   });
//   quoteView.render();
//
//   $quoteList.append(quoteView.render().$el);
});
