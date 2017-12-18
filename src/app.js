import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';

import Simulator from 'models/simulator';

import Quote from './models/quote';
import QuoteList from './collections/quote_list';

import QuoteView from './views/quote_view';
import QuoteListView from './views/quote_list_view';

import Order from './models/order';
import OrderList from './collections/order_list';

import OrderView from './views/order_view';
import OrderListView from './views/order_list_view';

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
  const orders = new OrderList();
  const simulator = new Simulator({
    quotes: quotes,
  });

  const quoteListView = new QuoteListView({
    model: quotes,
    template: _.template($('#quote-template').html()),
    tradesTemplate: _.template($('#trade-template').html()),
    el: 'main'
  });

  const orderListView = new OrderListView({
    model: orders,
    template: _.template($('#order-template').html()),
    el: 'main'
  });

  quoteListView.render();
  orderListView.render();

  simulator.start();

});
