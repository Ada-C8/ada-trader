import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

import Simulator from 'models/simulator';

// import Quote from './models/quote'
import QuoteList from './collections/quote_list'
import QuoteListView from './views/quote_list_view'

import OrderList from './collections/order_list'
import OrderListView from './views/order_list_view'

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

const quoteList = new QuoteList(quoteData);
const orderList = new OrderList();

$(document).ready(function() {
  const simulator = new Simulator({
    quotes: quoteList,
  });

  const quoteListView = new QuoteListView({
    model: quoteList,
    template: _.template($('#quote-template').html()),
    tradeTemplate: _.template($('#trade-template').html()),
    el: 'main',
  })

  const orderListView = new OrderListView({
    model: orderList,
    template: _.template($('#order-template').html()),
    el: '#order-workspace'
  })

  orderListView.render();

  quoteListView.render();

  simulator.start();
});

// wave 2: add and clone into a new collection?
