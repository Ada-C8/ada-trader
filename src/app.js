import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';

import Simulator from 'models/simulator';
import Quote from 'models/quote';
import QuoteView from 'views/quote_view';
import QuoteList from 'collections/quote_list';
import QuoteListView from 'views/quote_list_view';
import Order from 'models/order';
import OrderList from 'collections/order_list';
import OrderView from 'views/order_view';
import OrderListView from 'views/order_list_view';

let bus = {};
bus = _.extend(bus, Backbone.Events);
console.log(bus);
const quoteList = new QuoteList();

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

  // const order = new Order(quotes);
  const quoteListView = new QuoteListView({
  model: quotes,
  template: _.template($('#quote-template').html()),
  el: '#quotes-container',
  bus: bus
});
  quoteListView.render();

  const orders = new OrderList();
  const orderListView = new OrderListView({
    model: orders,
    symbols: quotes,
    template: _.template($('#order-template').html()),
    el: '#order-workspace',
    bus: bus
  })

  // OrderListView.render();
});
