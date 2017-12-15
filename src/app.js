import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

import Simulator from 'models/simulator';
import QuoteList from 'collections/quote_list';
import OrderList from 'collections/order_list';

import QuoteListView from './views/quote_list_view';
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
const orders = new OrderList();

// add options to select tag for dropdown in order form
const addOptions = function addOptions() {
  const select = $('select[name="symbol"]');
  const optArray = $('#quotes').find('h3.symbol');

  for (let i = 0; i < optArray.length; i += 1) {
    const opt = new Option(optArray[i].innerHTML, optArray[i].innerHTML);
    select.append(opt);
  }
};

$(document).ready(function() {

  const simulator = new Simulator({
    quotes: quotes,
  });

  simulator.start();

  let bus = {};
  bus = _.extend(bus, Backbone.Events);

  const quoteListView = new QuoteListView({
    model: quotes,
    bus: bus,
    template: _.template($('#quote-template').html()),
    tradeTemplate: _.template($('#trade-template').html()),
    el: '#quotes-container',
  });

  quoteListView.render();
  addOptions();

  const orderListView = new OrderListView({
    model: orders,
    quotes: quotes,
    bus: bus,
    template: _.template($('#order-template').html()),
    el: '#order-workspace',
  });
  orderListView.render();

});
