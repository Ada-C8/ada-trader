import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import Simulator from 'models/simulator';
import Quote from 'models/quote';
import Order from 'models/order';
import OpenOrders from 'collections/open_orders';
import QuoteList from 'collections/quote_list';
import QuoteListView from './views/quote_list_view';
import QuoteView from './views/quote_view';
import OrderView from './views/order_view';
import TradeListView from './views/trade_list_view';
import OrderFormView from './views/order_form_view';
import OpenOrderView from './views/open_orders_view';


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

let bus = {};
bus = _.extend(bus, Backbone.Events);


$(document).ready(function() {
  const quotes = new QuoteList(quoteData);

  const quoteListView = new QuoteListView({
    model: quotes,
    template: _.template($('#quote-template').html()),
    el: '.quotes-list-container',
    bus: bus,
  });
  quoteListView.render();

  const openOrders = new OpenOrders();
  const orderFormView = new OrderFormView({
    model: openOrders,
    bus: bus,
    el: '.order-entry-form',
  });
  orderFormView.render(quotes);

  // const order = new Order();
  // const orderView = new OrderView({
  //   template: _.template($('#order-template').html()),
  //   el: '.orders-list-container',
  //   model: order,
  //   bus: bus,
  // });

  const openOrderView = new OpenOrderView({
    template: _.template($('#order-template').html()),
    el: '.orders-list-container',
    bus: bus,
    model: openOrders,
  });
  openOrderView.render();

  const tradeListView = new TradeListView({
    template: _.template($('#trade-template').html()),
    el: '.trades-list-container',
    bus: bus,
  });
  tradeListView.render();

  const simulator = new Simulator({
    quotes: quotes,
  });
  simulator.start();

});
