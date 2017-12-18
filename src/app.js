import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';


import Simulator from 'models/simulator';
import QuoteList from 'collections/quote_list';
import Quote from 'models/quote';
import QuoteListView from './views/quote_list_view';
import Order from 'models/order';
import OrderList from 'collections/order_list';
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
  const simulator = new Simulator({
    quotes: quotes,
  });

  const quoteListView = new QuoteListView({
    model: quotes,
    template: _.template($('#quote-template').html()),
    tradeTemplate: _.template($('#trade-template').html()),
    el: 'main'
  });

  quotes.each((quote) => {
    $('select').append(`<option>${quote.get('symbol')}</option>`);
  });

  const orders = new OrderList;

  const orderListView = new OrderListView({
    model: orders,
    template: _.template($('#order-template').html()),
    el: 'main'
  });
  orderListView.render();
  quoteListView.renderQuote();
  simulator.start();
});
