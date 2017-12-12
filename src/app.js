import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';

import Simulator from 'models/simulator';
import QuoteList from 'collections/quote_list';
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

const renderList = (quoteList) => {

  const $quoteList = $('#quotes');
  $quoteList.empty();

  $quoteList.forEach((quote) => {

    const quoteView = new QuoteView({
      model: quote,
      template: _.template($('#quote-template').html()),
      tagName: 'li',
      className: 'quote',

    });

    $quoteList.append(quoteView.render().$el);
  }); // for each

}












$(document).ready(function() {
  const quotes = new QuoteList(quoteData);
  const simulator = new Simulator({
    quotes: quotes,
  });

  simulator.start();
});
