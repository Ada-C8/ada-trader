import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';

import Backbone from 'backbone';
import Simulator from 'models/simulator';

import Quote from 'models/quote';
import QuoteList from 'collections/quote_list';
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
  const orders = new OrderList();
  const simulator = new Simulator({
    quotes: quotes,
  });

  const quoteListView = new QuoteListView({
    model: quotes,
    template: _.template($('#quote-template').html()),
    el: '#quotes-container'

  });
  quoteListView.render();

  const formDropDown = function formDropDown() {
    const $formSelect = $('select[name=symbol]');

    quotes.forEach((quote) => {
      const quoteSymbol = quote.get('symbol');
      $formSelect.append(`<option value=${quoteSymbol}>${quoteSymbol}</option>`);
    });
  };
  formDropDown();

  const orderListView = new OrderListView({
    model: orders,
    template: _.template($('#order-template').html()),
    quoteList: quotes,
    el: '#order-workspace'
  });
  orderListView.render();

  simulator.start();
});
