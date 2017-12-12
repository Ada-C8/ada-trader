import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

import Simulator from 'models/simulator';
import QuoteList from 'collections/quote_list';
import QuoteView from 'views/quote_view';
import QuoteListView from 'views/quote_list_view';
import TradeHistoryView from 'views/trade_history_view';

let quoteViewTemplate;
let tradeTemplate;
let quotes;
// let quoteViewListTemplate;

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

const populateForm = function populateForm (e) {
  const $form_select = $('#order-form select[name="symbol"]');
  quotes.each((quote) => {
    const symbol = quote.get('symbol');
    $form_select.append(`<option value="${symbol}">${symbol}</option>`);
  });
};

$(document).ready(function() {
  let bus = {};
  _.extend(bus, Backbone.Events);

  quoteViewTemplate = _.template($('#quote-template').html());
  tradeTemplate = _.template($('#trade-template').html());
  quotes = new QuoteList(quoteData);
  const simulator = new Simulator({
    bus: bus,
    quotes: quotes,
  });
  const quotesView = new QuoteListView({
    bus: bus,
    el: 'main',
    model: quotes,
    template: quoteViewTemplate,
  });
  const tradeHistoryView = new TradeHistoryView({
    bus: bus,
    el: '#trades-container',
    template: tradeTemplate,
  });


  const orderForm = $('#order-form');
  _.extend(orderForm, Backbone.Events);
  orderForm.listenTo(quotes, 'add', populateForm);
  orderForm.listenTo(quotes, 'remove', populateForm);
  populateForm();

  simulator.start();
  quotesView.render();
});
