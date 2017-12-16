import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';

import Simulator from './models/simulator';
import QuoteList from './collections/quote_list';

import QuoteListView from './views/quote_list_view';
import TradeListView from './views/trade_list_view';
import OrderFormView from './views/order_form_view';

const quoteData = [
  {
    symbol: '유머',
    price: 88.50,
  },
  {
    symbol: '피복',
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

quoteData.forEach(function(quote) {
  $('#dropdown').append(`<option>${quote.symbol}</option>`)
})



$(document).ready(function() {
  const quotes = new QuoteList(quoteData);
  const simulator = new Simulator({
    quotes: quotes,
  });

  simulator.start();

  let bus = {};
  bus = _.extend(bus, Backbone.Events);

  let tradeTemplate = _.template($('#trade-template').html());

  const quoteListView = new QuoteListView({
    el: 'main',
    model: quotes,
    template: _.template($('#quote-template').html()),
    bus: bus,
  });

  const tradeListView = new TradeListView({
    el: '#trades-container',
    template: tradeTemplate,
    bus: bus,
  })
  const orderFormView = new OrderFormView({
    // quoteData: quoteData,
    el: '.order-entry-form'
  });

  quoteListView.render();

});
