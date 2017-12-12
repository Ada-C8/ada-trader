import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';

import Simulator from 'models/simulator';
import QuoteList from 'collections/quote_list';
import OrderList from 'collections/order_list';
import QuoteListView from 'views/quote_list_view';
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
  const quotes = new QuoteList(quoteData);

  const simulator = new Simulator({
    quotes: quotes,
  });

  simulator.start();
  //-------------------------------
  const quotesView = new QuoteListView({
    model: quotes,
    template: _.template($('#quote-template').html()),
    el: '#quotes-container',
  });

  quotesView.render();

  const orders = new OrderList();
  const ordersView = new OrderListView({
    model: orders,
    symbols: quotes,
    template: _.template($('#order-template').html()),
    el: '#order-workspace',
  });

  ordersView.render();

});
