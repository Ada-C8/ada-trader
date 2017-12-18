import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';

import Simulator from './models/simulator';
import QuoteList from './collections/quote_list';
import Order from './models/order'
import OrderList from './collections/order_list'

import QuoteListView from './views/quote_list_view';
import TradeListView from './views/trade_list_view';
import OrderFormView from './views/order_form_view';
import OrderListView from './views/order_list_view';

const quoteData = [
  {
    symbol: '유머',
    price: 88.50,
  },
  {
    symbol: '피복',
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

quoteData.forEach(function(quote) {
  $('#dropdown').append(`<option>${quote.symbol}</option>`)
})



$(document).ready(function() {


  let bus = {};
  bus = _.extend(bus, Backbone.Events);

  let template = _.template($('#quote-template').html());
  let tradeTemplate = _.template($('#trade-template').html());
  let orderTemplate = _.template($('#order-template').html());

  const quotes = new QuoteList(quoteData);
  const simulator = new Simulator({
    quotes: quotes,
  });
  const orders = new OrderList();

  const quoteListView = new QuoteListView({
    el: '#quotes-container',
    model: quotes,
    template: template,
    bus: bus,
  });

  const tradeListView = new TradeListView({
    el: '#trades-container',
    template: tradeTemplate,
    bus: bus,
  })
  const orderFormView = new OrderFormView({
    // quoteData: quoteData,
    el: '.order-entry-form',
    bus: bus,
    orderList: orders,
    quoteList: quotes,
  });

  const order = new Order({
    bus: bus,
  })

  const orderListView = new OrderListView({
    el: '.orders-list-container',
    model: orders,
    template: orderTemplate,
    bus: bus,
  });


  orderListView.render();
  quoteListView.render();

  simulator.start();


});
