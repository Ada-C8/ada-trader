// css
import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

// vendor modules
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

//simulator
import Simulator from 'models/simulator';

// files
import QuoteList from 'collections/quote_list';
import Quote from 'models/quote';
import QuoteListView from 'views/quote_list_view';
import QuoteView from 'views/quote_view';

import TradeHistoryView from 'views/trade_history_view';

import Order from 'models/order';
import OrderList from 'collections/order_list';
import OpenOrderView from 'views/open_order_view';
import OpenOrderListView from 'views/open_order_list_view';

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

  const quotes = new QuoteList(quoteData);
  const simulator = new Simulator({ // passing in a hash with a key quotes
    quotes: quotes,
  });

  simulator.start();

  let quoteTemplate = _.template($('#quote-template').html());

  const quoteListView = new QuoteListView({
    el: 'main',
    model: quotes,
    template: quoteTemplate,
  });

  quoteListView.render();

/////////trade history /////
  let tradeHistoryTemplate = _.template($('#trade-template').html());

  const tradeHistoryView = new TradeHistoryView({
    el: 'main',
    model: quotes,
    template: tradeHistoryTemplate
  });

  tradeHistoryView.bind();

  /////// order entry form //////

  const orders = new OrderList();

  quotes.forEach(function(quote) {
    // console.log(quote);
    $('#select-symbol').append($('<option>', {
      value: quote.get('symbol'),
      text: quote.get('symbol')
    }));
  });

  $('#order-form').on('submit', function(event) {
    event.preventDefault();
  });

  $('#order-form .btn-buy').on('click', function(event) {
    event.preventDefault();
    let orderData = {
      buy: true
    };

    orderData['symbol'] = $('#select-symbol').val();
    orderData['targetPrice'] = parseFloat($('#order-price').val());

    let order = new Order(orderData);
    orders.push(order);
    // console.log(orderData);
  });

  let orderTemplate = _.template($('#order-template').html());

  const openOrderListView = new OpenOrderListView({
    el: 'main',
    model: orders,
    template: orderTemplate,
  });

  openOrderListView.render();

});
