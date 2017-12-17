import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';

// Models and Collections
import Simulator from 'models/simulator';

import Quote from 'models/quote';
import QuoteList from 'collections/quote_list';

import OpenOrder from 'models/order'
import OrderList from 'collections/order_list';

// Views
import QuoteView from 'views/quote_view';
import QuoteListView from 'views/quote_list_view';
import OrderView from 'views/order_view';
import OrderListView from 'views/order_list_view';
import TradeView from 'views/trade_view';

// Templates
let quoteTemplate;
let tradeTemplate;
let orderTemplate;

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

const quotes = new QuoteList();
const orders = new OrderList();
const simulator = new Simulator({
  quotes: quotes,
});

// If quoteData was not hardcoded, would need validation on the data prior to adding to the collection
const checkQuotes = (quoteData) => {
  quoteData.forEach((quote) => {
    const newQuote = new Quote(quote);
    if (newQuote.isValid()) {
      quotes.add(newQuote);
    } else {
      let errors = newQuote.validationError
      Object.keys(errors).forEach((key) => {
        $('#quote-errors').append(`<p>${errors[key]}</p>`);
      });
    }
  });
};

$(document).ready(function() {
  let bus = {};
  bus = _.extend(bus, Backbone.Events);

  quoteTemplate = _.template($('#quote-template').html());
  tradeTemplate = _.template($('#trade-template').html());
  orderTemplate = _.template($('#order-template').html());

  checkQuotes(quoteData);

  const orderListView = new OrderListView({
    el: '#order-workspace',
    template: orderTemplate,
    model: orders,
    bus: bus,
  });

  const quoteListView = new QuoteListView({
    el: 'main',
    model: quotes,
    template: quoteTemplate,
    bus: bus,
  });

  const tradeView = new TradeView({
    el: '#trades',
    template: tradeTemplate,
    bus: bus,
  });

  quoteListView.render();

  simulator.start();
});
