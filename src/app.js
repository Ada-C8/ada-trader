// TODO: trigger event every time price changes that will attempt to complete open orders
// TODO: create open orders using the form
// TODO: return form errors when attempting to create an invalid open order


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

const orderData = [
  {
    symbol: 'HUMOR',
    targetPrice: 80.50,
    buy: false,
  },
  {
    symbol: 'HUMOR',
    targetPrice: 89.50,
    buy: true,
  },
];

$(document).ready(function() {
  quoteData.map( quote => quote.symbol ).forEach((symbol) => {
    $("select[name='symbol']").append($('<option>', {
      value: symbol,
      text: symbol})
    );
  });

  let eventBus = {};
  eventBus = _.extend(eventBus, Backbone.Events);
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

  const orderData = [
    {
      symbol: 'HUMOR',
      targetPrice: 80.50,
      buy: false,
      bus: eventBus,
    },
    {
      symbol: 'HUMOR',
      targetPrice: 89.50,
      buy: true,
      bus: eventBus,
    },
  ];

  const orders = new OrderList(orderData);
  orders.bus = eventBus;
  const orderListView = new OrderListView({
    model: orders,
    template: _.template($('#order-template').html()),
    el: 'main',
    bus: eventBus,
  });
  orderListView.render();

  const simulator = new Simulator({
    quotes: quotes,
    bus: eventBus,
  });
  simulator.start();
});
