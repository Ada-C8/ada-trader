import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';

import Simulator from 'models/simulator';
import QuoteList from 'collections/quote_list';
import QuoteListView from 'views/quote_list_view';
import OrderList from 'collections/order_list';
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
  const orders = new OrderList();
  const simulator = new Simulator({
    quotes: quotes,
  });
  const quoteTemp = _.template($('#quote-template').html());
  const tradeTemp = _.template($('#trade-template').html());
  const orderTemp = _.template($('#order-template').html());

  const dropdown = function dropdown() {
    quotes.each((quote) => {
      const symbol = quote.get('symbol');
      $('select[name="symbol"]').append(`<option value="${symbol}">${symbol}</option>`);
    });
  };

  //create new quote view obj
  const quoteListView = new QuoteListView({
    model: quotes,
    quoteTemplate: quoteTemp,
    tradeTemplate: tradeTemp,
    el: 'main',
    bus: bus,
  });

  const orderListView = new OrderListView({
    model: orders,
    quotes: quotes,
    template: orderTemp,
    bus: bus,
    el: '#order-workspace'
  });

  dropdown();
  orderListView.render();
  quoteListView.render();

  simulator.start();

});
