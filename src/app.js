import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';

import Backbone from 'backbone';
import Simulator from 'models/simulator';
import Quote from 'models/quote';
import QuoteList from 'collections/quote_list';
import QuoteView from './views/quote_view';
import QuoteListView from './views/quote_list_view';
import TradeView from './views/trade_view';
import OrderList from 'collections/order_list';
import Order from 'models/order';
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

$(document).ready(function() {
  const quotes = new QuoteList(quoteData);

  const simulator = new Simulator({
    quotes: quotes,
  });
  simulator.start();


  const quoteListview = new QuoteListView({
    model: quotes,
    template: _.template($('#quote-template').html()),
    el: '.quotes-list-container'
  });
  quoteListview.render();


  const tradeView = new TradeView({
    model: quotes,
    template: _.template($('#trade-template').html()),
    el: '.trades-list-container'
  });
  tradeView.helper();

  $('#orderForm').on('submit', (event) => {
    event.preventDefault();
  });

  quotes.each((quote) => {
    $('#orderForm select').append($('<option>', {
      value: quote.get('symbol'),
      text: quote.get('symbol')
    }));
  });

  $('#orderForm .btn-buy').on('click', (event) => {
    event.preventDefault();
    let orderData = {
      buy: true
    };

    orderData.symbol = $('#orderForm select').val();
    orderData.targetPrice = parseFloat($('#target-price').val());

    let order = new Order(orderData);
    orders.append(order);
  });

  $('#orderForm .btn-sell').on('click', (event) => {
    event.preventDefault();
    let orderData = {
      buy: false
    };

    orderData.symbol = $('#orderForm select').val();
    orderData.targetPrice = parseFloat($('#target-price').val());

    let order = new Order(orderData);
    orders.append(order);
  });

  const orderListView = new OrderListView({
    model: orders,
    template: _.template($('#order-template').html()),
    el: '.orders-list-container'
  });
});
