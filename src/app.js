import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import Simulator from 'models/simulator';
import OrderList from 'collections/order_list';
import QuoteList from 'collections/quote_list';
import QuoteListView from './views/quote_list_view';
import TradeListView from './views/trade_list_view';
import OrderFormView from './views/order_form_view';
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

let bus = {};
bus = _.extend(bus, Backbone.Events);

$(document).ready(function() {
  // Populate the Quote collection
  const quotes = new QuoteList(quoteData);

  // Initiates the Quote List view, gives it the Quote collection as a model & renders it
  const quoteListView = new QuoteListView({
    model: quotes, // Quote collection
    template: _.template($('#quote-template').html()),
    el: '.quotes-list-container',
    bus: bus,
  });
  quoteListView.render();

  // Initiates the trade history view & renders it
  const tradeListView = new TradeListView({
    template: _.template($('#trade-template').html()),
    el: '.trades-list-container',
    bus: bus,
  });
  tradeListView.render();

  // Initiates a new Order collection
  const orderList = new OrderList();

  // Initiates an Order Form View, gives it the empty Order collection as model (so that e can add newly created orders to the OrderList collection) & renders it (will passing it the quotes to populate the select button)
  const orderFormView = new OrderFormView({
    model: orderList,
    bus: bus,
    el: '.order-entry-form',
    quotes: quotes,
  });
  orderFormView.render(quotes);

  // Initiates a new Open orders view, gives it the empty Order collection as model & renders it
  const orderListView = new OrderListView({
    model: orderList,
    template: _.template($('#order-template').html()),
    el: '.orders-list-container',
    bus: bus,
  });
  orderListView.render();

  // Initiates the simulator & starts it
  const simulator = new Simulator({
    quotes: quotes,
  });
  simulator.start();
});
