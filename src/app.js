import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';

import Simulator from 'models/simulator';
import QuoteList from 'collections/quote_list';
import QuoteView from './views/quote_view';
import QuoteListView from './views/quote_list_view';
import TradeHistoryView from './views/trade_history_view';

const quoteList = new QuoteList();
let quoteTemplate;
let tradeTemplate;

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
  let bus = {};
  bus = _.extend(bus, Backbone.Events);
  tradeTemplate = _.template($('#trade-template').html());
  quoteTemplate = _.template($('#quote-template').html());
  const quotes = new QuoteList(quoteData);
  const simulator = new Simulator({
    quotes: quotes,
  });
  simulator.start();

  // $('#selected_trade').empty();
  const tradeHistoryView = new TradeHistoryView({
    bus: bus,
    template: tradeTemplate,
    el: $('#trades'),
  });

  tradeHistoryView.render();
  const quoteListView = new QuoteListView({
    model: quotes,
    template: quoteTemplate,
    el: '#quotes-container',
    bus: bus,
  });
  quoteListView.render();
});
