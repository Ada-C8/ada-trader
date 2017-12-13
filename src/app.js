// CSS
import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

// Vendor Modules
import $ from 'jquery';
import _ from 'underscore';

// Models
import Simulator from './models/simulator';
import QuoteList from './collections/quote_list';
import OrderList from './collections/order_list';

// Views
import QuoteListView from './views/quote_list_view';
import OrderListView from './views/order_list_view';

// Data
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

  const quoteList = new QuoteList(quoteData);

  const orderList = new OrderList;

  const simulator = new Simulator({
    quotes: quoteList,
  });

  simulator.start();

  const quoteListView = new QuoteListView({
    model: quoteList,
    template: _.template($('#quote-template').html()),
    tradeTemplate: _.template($('#trade-template').html()),
    el: 'main',
    orderList: orderList
  });

  const orderListView = new OrderListView({
    model: orderList,
    template: _.template($('#order-template').html()),
    el: 'main',
    quoteListView: quoteListView
  });

  quoteListView.render();
});
