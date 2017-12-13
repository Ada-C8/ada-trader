import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

import Simulator from 'models/simulator';
import QuoteList from 'collections/quote_list';
import QuoteView from 'views/quote_view';
import QuoteListView from 'views/quote_list_view';
import Order from 'models/order';
import OrderList from 'collections/order_list';
import OrderListView from 'views/order_list_view';
import TradeHistoryView from 'views/trade_history_view';

let quoteViewTemplate;
let tradeTemplate;
let orderTemplate;
let quotes;
// let quoteViewListTemplate;

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

quotes = new QuoteList(quoteData);
const orders = new OrderList();

const populateForm = function populateForm () {
  const $form_select = $('#order-form select[name="symbol"]');
  quotes.each((quote) => {
    const symbol = quote.get('symbol');
    $form_select.append(`<option value="${symbol}">${symbol}</option>`);
  });
};

const newBuy = function newBuy(e) {
  newOrder(e, true);
};

const newSell = function newBuy(e) {
  newOrder(e, false);
};

const newOrder = function newOrder(e, isBuy) {
  e.preventDefault();
  clearFormErrors();
  const formData = getOrderFormData();
  formData['buy'] = isBuy;
  formData['stockPrice'] = quotes.findWhere({'symbol': formData['symbol']}).get('price');
  const order = new Order(formData);
  if (order.isValid()){
    $('#order-form')[0].reset();
    orders.add(order);
  } else {
    displayOrderFormErrors(order.validationError);
  }
};

const displayOrderFormErrors = function displayOrderFormErrors(errors) {
  const el = $('#form-errors');
  for(let field in errors) {
    for (let error of errors[field]) {
      el.append(`<p class="error">${error}</p>`)
    }
  }
};

const clearFormErrors = function clearFormErrors() {
  const el = $('#form-errors');
  el.html('');
};

const getOrderFormData = function getFormData() {
  const data = {};
  data['symbol'] = $(`#order-form select[name="symbol"]`).val();
  data['targetPrice'] = parseFloat($(`#order-form input[name="price-target"]`).val());
  return data;
};

$(document).ready(function() {
  let bus = {};
  _.extend(bus, Backbone.Events);

  quoteViewTemplate = _.template($('#quote-template').html());
  tradeTemplate = _.template($('#trade-template').html());
  orderTemplate = _.template($('#order-template').html());
  const simulator = new Simulator({
    bus: bus,
    quotes: quotes,
  });
  const quotesView = new QuoteListView({
    bus: bus,
    el: '#quotes-container',
    model: quotes,
    template: quoteViewTemplate,
  });
  const tradeHistoryView = new TradeHistoryView({
    bus: bus,
    el: '#trades-container',
    template: tradeTemplate,
  });
  const orderListView = new OrderListView({
    bus: bus,
    el: '#orders-container',
    model: orders,
    template: orderTemplate,
  });

  const orderForm = $('#order-form');
  _.extend(orderForm, Backbone.Events);
  populateForm();

  $('#order-form').on('click', 'button.btn-buy', newBuy);
  $('#order-form').on('click', 'button.btn-sell', newSell);

  simulator.start();
  quotesView.render();
});
