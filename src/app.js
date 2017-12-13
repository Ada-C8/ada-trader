import 'foundation-sites/dist/foundation.css';
import 'css/app.css';
import QuoteView from './views/quote_view';

import $ from 'jquery';
import _ from 'underscore';

import Simulator from 'models/simulator';
import QuoteList from 'collections/quote_list';

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
quotes.each((quote) => {
  const quoteView = new QuoteView({
    model: quote,
    template: _.template($('#quote-template').html()),
    tagName: 'li',
    className: 'quote',
    });
    quoteView.render();
    $('.quotes').append(quoteView.$el);
    // $('.quotes').append(quoteView.render().$el);
  });


  simulator.start();
});
