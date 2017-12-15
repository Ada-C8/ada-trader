// Vendor Modules
import $ from 'jquery';
import _ from 'underscore';

// CSS
import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

// Models
import Quote from 'models/quote';
import Order from 'models/order';
import Simulator from 'models/simulator';
import QuoteList from 'collections/quote_list';
import OrderList from 'collections/order_list';

// Views
import QuoteView from 'views/quote_view';
import QuoteListView from 'views/quote_list_view';
import OrderView from 'views/order_view';
import OrderListView from 'views/order_list_view';

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

  console.log(quotes);
  const quoteListView = new QuoteListView({
    model: quotes,
    template: _.template($('#quote-template').html()),
    tradeTemplate: _.template($('#trade-template').html()),
    el: 'main',
  });

  const formDropDown = function formDropDown() {
    const $formSelect = $('select[name=symbol]');

    quotes.forEach((quote) => {
      const quoteSymbol = quote.get('symbol');
      $formSelect.append(`<option value=${quoteSymbol}>${quoteSymbol}</option>`);
    });
  };

  const orders = new OrderList();

  //console.log(orders);
  const orderListView = new OrderListView({
    model: orders,
    template: _.template($('#order-template').html()),
    quoteList: quotes,
    el: '#order-workspace',
  });

  //console.log('TEST');

  formDropDown();
  quoteListView.render();
  orderListView.render();
  simulator.start();
});
