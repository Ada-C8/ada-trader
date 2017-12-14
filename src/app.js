import 'foundation-sites/dist/foundation.css';
import 'css/app.css';
import _ from 'underscore';
import $ from 'jquery';

import Simulator from 'models/simulator';
import QuoteList from 'collections/quote_list';
import QuoteListView from './views/quote_list_view';
import TradeList from 'collections/trade_list';
import TradeListView from './views/trade_list_view';
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

const quoteList = new QuoteList(quoteData);
const tradeList = new TradeList();

$(document).ready(function() {
  let bus = {};
  bus = _.extend(bus, Backbone.Events);

  // const quotes = new QuoteList(quoteData);
  const simulator = new Simulator({
    quotes: quoteList,
  });

  const quoteListView = new QuoteListView({
    model: quoteList,
    template: _.template($('#quote-template').html()),
    el: '.quotes-list-container',
    bus: bus,
  });

  const tradeListView = new TradeListView({
    model: tradeList,
    template: _.template($('#trade-template').html()),
    el: '.trades-list-container',
    bus: bus,
  });

  tradeListView.render();
  quoteListView.render();
  simulator.start();

  $('#orderForm').on('submit', (event) => {
    event.preventDefault();
  });

  quoteList.each((quote) => {
    $('#orderForm select').append($('<option>', {
      value: quote.get('symbol'),
      text: quote.get('symbol')
    }));
  });

  $('#orderForm .btn-buy').on('click', (event) => {
    event.preventDefault();
    createOrder(true);
  });

  $('#orderForm .btn-sell').on('click', (event) => {
    event.preventDefault();
    createOrder(false);
  });

  const orderList = new OrderList();

  const createOrder = (isBuy) => {
    let orderData = {
      buy: isBuy
    };

    orderData['symbol'] = $('#orderForm select').val();
    orderData['targetPrice'] = parseFloat($('#orderForm .price-target').val());

    $('#orderForm select').val($('#orderForm select option:first').val());
    $('#orderForm .price-target').val('');

    orderList.add(new Order(orderData));
  };

  const orderListView = new OrderListView({
    model: orderList,
    template: _.template($('#order-template').html()),
    el: '.orders-list-container'
  });
});
