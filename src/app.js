import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';

import Simulator from 'models/simulator';
import Quote from 'models/quote';
import QuoteList from 'collections/quote_list';
import Order from 'models/order';
import OrderList from 'collections/order_list';

import QuoteView from './views/quote_view';
import QuoteListView from './views/quote_list_view';
import TradeHistoryView from './views/trade_history_view';
import OrderView from './views/order_view';
import OrderListView from './views/order_list_view';
import OrderEntryView from './views/order_entry_view';

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

// const renderList = (quoteList) => {
//   const $quoteList = $();
//   $quoteList.empty();
//
//   quoteList.forEach((quote) => {
//     const quoteView = new QuoteView({
//       model: quote,
//       template: _.template($('#quote-template').html()),
//       tagName: 'li',
//       className: 'quote',
//     });
//     $quoteList.append(quoteView.render().$el);
//   });
// };

let quoteTemplate;
let tradeTemplate;
let orderTemplate;
const bus = _.extend({}, Backbone.Events);

$(document).ready(function() {
  // Quotes
  const quotes = new QuoteList(quoteData);
  const simulator = new Simulator({
    quotes: quotes,
  });

  simulator.start();

  quoteTemplate = _.template($('#quote-template').html());

  const quoteListView = new QuoteListView ({
    model: quotes,
    template: quoteTemplate,
    el: 'main',
  });

  quoteListView.render();

  // Trade History
  tradeTemplate = _.template($('#trade-template').html());

  const tradeHistoryView = new TradeHistoryView({
    model: quotes,
    template: tradeTemplate,
    el: 'main',

  });

  tradeHistoryView.bind();

  // Add orders
  const orders = new OrderList();

  $('#orderForm').on('submit', function(event) {
    event.preventDefault();
  });

  quotes.each((quote) => {
    $('#orderForm select').append($('<option>', {
      value: quote.get('symbol'),
      text: quote.get('symbol')
    }));
  });

  const orderEntryView = new OrderEntryView({
    el: '.order-entry-form',
    bus: bus,
  });

  orderTemplate = _.template($('#order-template').html());
  const orderListView = new OrderListView({
    model: orders,
    template: orderTemplate,
    el: '.orders-list-container',
    bus: bus,
  });


  // // render one quote
  // const $quoteList = $('#quotes');
  //
  //   const quoteView = new QuoteView({
  //     // el: 'ul',
  //     model: quotes.at(0),
  //     template: quoteTemplate,
  //     tagName: 'li',
  //     className: 'quote'
  //   });
  //   $('#quotes-list')quoteView.render();
  //
  //   $quoteList.append(quoteView.render().$el);

});
