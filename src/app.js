import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';


import Simulator from 'models/simulator';
import QuoteList from 'collections/quote_list';
import OrderList from 'collections/order_list';

import QuoteListView from 'views/quote_list_view';
import TradeListView from 'views/trade_list_view';
import FormView from 'views/form_view';
import OrderListView from 'views/order_list_view';

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
  let bus = {};
  bus = _.extend(bus, Backbone.Events);

  const quotes = new QuoteList(quoteData);
  const simulator = new Simulator({
    quotes: quotes,
  });
  const orders = new OrderList;
  const quoteListView = new QuoteListView({
    model: quotes,
    template: _.template($('#quote-template').html()),
    el: '#quotes-container',
    bus: bus,
  });
  // quotes.each((quote) => {
  //   $('select').append(`<option value="${quote.get('symbol')}">${quote.get('symbol')}</option>`);
  // });
  const formView = new FormView({
    model: quotes,
    template: _.template($('#form-template').html()),
    el: '.order-entry-form',
    bus: bus,
  });

  const tradeListView = new TradeListView({
    template: _.template($('#trade-template').html()),
    bus: bus,
    el: 'main'
  });

  const orderListView = new OrderListView({
    model: orders,
    template: _.template($('#order-template').html()),
    bus: bus,
    el: '#order-workspace',
  });

  quoteListView.render();
  formView.render();
  orderListView.render();
  // tradeListView.render();

  simulator.start();
});
