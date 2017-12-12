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

// const order = new Order();
// const orderView = new OrderView({
//   model: order,
//   template: _.template($('#task-template').html()),
//   el: 'main',
// });

$(document).ready(function() {

  const quotes = new QuoteList(quoteData);
  const simulator = new Simulator({
    quotes: quotes,
  });

  simulator.start();

  const quoteListView = new QuoteListView({
  model: quotes,
  template: _.template($('#quote-template').html()),
  el: '#quotes-container',
});
  quoteListView.render();

  const orders = new OrderList();
  const orderListView = new OrderListView({
    model: orders,
    symbols: quotes,
    template: _.template($('#order-template').html()),
    el: '#order-workspace',
  })

  // OrderListView.render();
});
