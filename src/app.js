import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';

import Simulator from 'models/simulator';
import QuoteList from 'collections/quote_list';
import QuoteView from './views/quote_view';
import QuoteListView from './views/quote_list_view';

const quoteList = new QuoteList();
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
// should be able to delete this 
const renderList = function(quoteList) {
  const $quoteList = $('#quotes');
  $quoteList.empty();

  quoteList.forEach((quote) =>{
    const quoteView = new TaskView({
      model: quote,
      template: _.template($('#quote-template').html()),
      tagName: 'li',
      className: 'quote',
    });
    $quoteList.append(quoteView.render().$el);
  });
};
//
$(document).ready(function() {
  quoteTemplate = _.template($('#quote-template').html());
  const quotes = new QuoteList(quoteData);
  const simulator = new Simulator({
    quotes: quotes,
  });
  simulator.start();

  const quoteListView = new QuoteListView({
    model: quoteList,
    template: quoteTemplate,
    el: 'main'
  });
  quoteListView.render();
});
