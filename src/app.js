import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';

import Simulator from 'models/simulator';
import Quote from 'models/quote';
import QuoteList from 'collections/quote_list';
import QuoteView from 'views/quote_view';
import QuoteListView from 'views/quote_list_view';

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



$(document).ready(() => {
  const quotes = new QuoteList(quoteData);
  // quoteTemplate = _.template($('#quote-template').html());
  // append to symbol label
  function dropdown(){
    const $label = $(`select[name=symbol]`);
    quotes.forEach(function(quote) {
      let dropdownItem = `<option value= ${quote.get('symbol')}> ${quote.get('symbol')}</option>`;
      $label.append(dropdownItem);
    });
  }
  dropdown();


  const simulator = new Simulator({
    quotes: quotes,
  });

  const quoteListView = new QuoteListView({
    model: quotes,
    template: _.template($('#quote-template').html()),
    tradeTemplate: _.template($('#trade-template').html()),
    el: 'main',
  });

  quoteListView.render();

  simulator.start();
});
