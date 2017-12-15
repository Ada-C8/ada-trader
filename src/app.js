import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';

import Simulator from './models/simulator';
//import Quote from './models/quote';
import QuoteList from './collections/quote_list';
//import QuoteView from './views/quote_view';
import QuoteListView from './views/quote_list_view';
import Order from './models/order';
import OrderList from './collections/order_list';
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

const quotes = new QuoteList(quoteData);

const orderData = [
  {
    buy: true,
    currentPrice: quotes.findWhere({symbol: 'HUMOR'}).get('price'),
    targetPrice: 77.1,
    symbol: 'HUMOR',
  },
  {
    buy: false,
    currentPrice: quotes.findWhere(),
    targetPrice: 120.4,
    symbol: 'CLOTH',
  },
]

const orders = new OrderList(orderData);

$(document).ready(function() {

  const simulator = new Simulator({
    quotes: quotes,
  });

  simulator.start();
  const quoteListView = new QuoteListView ({
    model: quotes,
    quoteTemplate: _.template($('#quote-template').html()),
    tradeTemplate: _.template($('#trade-template').html()),
    el: 'main',
  });

  quoteListView.render();

  const orderListView = new OrderListView ({
    model: orders,
    orderTemplate: _.template($('#order-template').html()),
    el: '.orders-list-container',
  });

  orderListView.render();
});
