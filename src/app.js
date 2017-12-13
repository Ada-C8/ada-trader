// css
import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

// vendor modules
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

//simulator
import Simulator from 'models/simulator';

// files
import QuoteList from 'collections/quote_list';
import Quote from 'models/quote';
import QuoteListView from 'views/quote_list_view';
import QuoteView from 'views/quote_view';
import TradeHistoryView from 'views/trade_history_view';

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
  const simulator = new Simulator({ // passing in a hash with a key quotes
    quotes: quotes,
  });

  simulator.start();

  let quoteTemplate = _.template($('#quote-template').html());

  const quoteListView = new QuoteListView({
    el: 'main',
    model: quotes,
    template: quoteTemplate,
  });

  quoteListView.render();


  let tradeHistoryTemplate = _.template($('#trade-template').html());

  const tradeHistoryView = new TradeHistoryView({
    el: 'main',
    model: quotes,
    template: tradeHistoryTemplate
  });

  tradeHistoryView.bind();

});
