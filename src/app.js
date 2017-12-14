import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

import Simulator from 'models/simulator';
import QuoteList from 'collections/quote_list';
import QuoteListView from 'views/quote_list_view';
import TradeList from 'collections/trade_list';
import TradeListView from 'views/trade_list_view';
import OrderList from 'collections/order_list';
import OrderListView from 'views/order_list_view';

let eventBus = {};
eventBus = _.extend(eventBus, Backbone.Events);

const addErrors = function addErrors(message) {
  $('.form-errors').append(`<h3>${message}</h3>`);
}

const getFormData = function getFormData(orderData) {
  ['symbol', 'targetPrice'].forEach( (field) => {
    let val = $(`.order-entry-form [name=${field}]`).val();
    if (field === 'targetPrice') {
      val = parseFloat(val);
    }
    if (val != '' && val != undefined) {
      orderData[field] = val;
    }
  });
  return orderData;
};

const quoteData = [
  {
    symbol: 'HUMOR',
    price: 88.50,
    bus: eventBus,
  },
  {
    symbol: 'CLOTH',
    price: 81.70,
    bus: eventBus,
  },
  {
    symbol: 'HABIT',
    price: 98.00,
    bus: eventBus,
  },
  {
    symbol: 'SUPER',
    price: 83.10,
    bus: eventBus,
  },
];

$(document).ready(function() {
  eventBus.listenTo(eventBus, 'formErrors', addErrors);

  const clearFormErrors = function clearFormErrors() {
    $('.form-errors').empty();
  };

  $("select[name='symbol']").append($('<option disabled selected value>'));
  quoteData.map( quote => quote.symbol ).forEach((symbol) => {
    $("select[name='symbol']").append($('<option>', {
      value: symbol,
      text: symbol})
    );
  });

  const tradeList = new TradeList();
  const tradeListView = new TradeListView({
    model: tradeList,
    template: _.template($('#trade-template').html()),
    el: 'main',
    bus: eventBus,
  })
  tradeListView.render();

  const quotes = new QuoteList(quoteData);
  const quoteListView = new QuoteListView({
    model: quotes,
    template: _.template($('#quote-template').html()),
    el: 'main',
    bus: eventBus,
  });
  quoteListView.render();

  const orders = new OrderList();
  orders.bus = eventBus;
  const orderListView = new OrderListView({
    model: orders,
    template: _.template($('#order-template').html()),
    el: 'main',
    bus: eventBus,
  });
  orderListView.render();

  $('.order-entry-form .btn-buy, .order-entry-form .btn-sell').on('click', function(event) {
    event.preventDefault();
    clearFormErrors();
    const buying = event.currentTarget.classList.value.includes('btn-buy');
    let orderData = {buy: buying, bus: eventBus};
    orderData = getFormData(orderData);
    eventBus.trigger('createOrder', orderData, quotes);
  })

  const simulator = new Simulator({
    quotes: quotes,
    bus: eventBus,
  });
  simulator.start();
});
