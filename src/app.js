import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';

import Simulator from 'models/simulator';
import Quote from 'models/quote';
import OpenOrder from 'models/order'

import QuoteList from 'collections/quote_list';
import OrderList from 'collections/order_list';

import QuoteView from 'views/quote_view';
import QuoteListView from 'views/quote_list_view';

import OrderView from 'views/order_view';
import OrderListView from 'views/order_list_view';

import TradeView from 'views/trade_view';

let quoteTemplate;
let tradeTemplate;

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
  let bus = {};
  bus = _.extend(bus, Backbone.Events);

  quoteTemplate = _.template($('#quote-template').html());
  tradeTemplate = _.template($('#trade-template').html());
  const quotes = new QuoteList(quoteData);
  const orders = new OrderList(quoteData); ///////////////////
  const simulator = new Simulator({
    quotes: quotes,
  });

  const quoteListView = new QuoteListView({
    el: 'main', // TODO: Can this be anything else but main? Why does this even need to be set? I do not see main attached to the DOM
    model: quotes,
    template: quoteTemplate,
    bus: bus,
  });

  const tradeView = new TradeView({
    el: '#trades',
    template: tradeTemplate,
    bus: bus,
  });

  const orderListView = new OrderListView({ /////////////
    model: orders,
    bus: bus,
  });

  // const orderView = new OrderView({
  //   el: 'form select',
  //   // model: order,
  // });

  quoteListView.render();

  simulator.start();
});

// Instatiante the view in the document ready and then set the attributes of the current view
// Compile the template the trade view and then pass it in as
// this.$el.prepend(compiledTemplate)
