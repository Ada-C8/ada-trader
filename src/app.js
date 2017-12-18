import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';

import Simulator from 'models/simulator';

import QuoteList from 'collections/quote_list';
import Quote from 'models/quote';
import QuoteView from './views/quote_view';
import QuoteListView from './views/quote_list_view';

import TradeHistoryView from './views/trade_history_view';

import OrderListView from './views/order_list_view';
import OrderFormView from './views/order_form_view';
import OrderView from './views/order_view';
import Order from 'models/order';
import OrderList from 'collections/order_list';

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

// const quoteList = new QuoteList();
let quoteTemplate;


$(document).ready(function() {
  let bus = {};

  bus = _.extend(bus, Backbone.Events);

  const quotes = new QuoteList(quoteData);
  const simulator = new Simulator({
    quotes: quotes,
  });
  // const $quoteList = $('#quotes');
  //
  // const quoteView = new QuoteView({
  //   model: quotes.at(0),
  //   template: _.template($('#quote-template').html()),
  //   tagName: 'li',
  //   className: 'quote',
  // });
  // THESE ARE THE THINGS THAT BACKBONE EXPECTS except for template, which is why we initialized template.

  // $quoteList.append(quoteView.render().$el);


  simulator.start();


  quoteTemplate = _.template($('#quote-template').html());

  const quoteListView = new QuoteListView({
    //this is what params becomes
    el: '#quotes',
    model: quotes, //need explanation
    template: quoteTemplate,
    tradeTemplate:  _.template($('#trade-template').html()),
    bus: bus,
  });

  const order = new Order;
  const orders = new OrderList();

  const orderListView = new OrderListView({
    el: '#orders',
    model: orders,
    template: _.template($('#order-template').html()),
  });



  const orderFormView = new OrderFormView({
    el: '#order-entry-form',
    orderList: orders,
    quoteList: quotes
  });

  quoteListView.render();
  orderListView.render();
  orderFormView.render();

  // const quoteView = new QuoteView({
  //   el: 'ul',
  //   model: quote,
  //   template: quoteTemplate,
  // });
  //
  // quoteView.render();
});
