import $ from 'jquery';
import _ from 'underscore';

import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import Simulator from 'models/simulator';
import QuoteList from 'collections/quote_list';
import Quote from 'models/quote';
import Order from 'models/order';
import OrderList from 'collections/order_list';

import QuoteView from 'views/quote_view';
import QuoteListView from 'views/quote_list_view';
import OrderView from 'views/order_view';
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
  const quoteListView = new QuoteListView({
    model: quotes,
    quotesTemplate: _.template($('#quote-template').html()),
    el: '.workspace'
  });
  quoteListView.render();

  function dropdown(){
    const $label = $(`select[name=symbol]`);
    quotes.forEach(function(quote) {
      let dropdownItem = `<option value=${quote.get('symbol')}>${quote.get('symbol')}</option>`;
      $label.append(dropdownItem);
    });
  }
  dropdown();

  const orders = new OrderList();
  const orderListView = new OrderListView({
    model: orders,
    ordersTemplate: _.template($('#order-template').html()),
    el: '#order-workspace',
    quotes: quotes
  });
  // orderListView.quotes = quotes;
  orderListView.render();

  simulator.start();

  // orders.add(new Order({buy: true, price: 49.00, symbol: "JULIA"}));
});
