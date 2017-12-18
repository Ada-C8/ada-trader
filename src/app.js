import Backbone from 'backbone';

import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';

import Simulator from 'models/simulator';

import Quote from './models/quote';
import QuoteList from './collections/quote_list';

import QuoteView from './views/quote_view';
import QuoteListView from './views/quote_list_view';

import TradeHistoryView from './views/trade_history_view';

import Order from './models/order';
import OrderList from './collections/order_list';

import OrderView from './views/order_view';
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

// const orderData = [
//   {
//     symbol: 'HUMOR',
//     targetPrice: 88.50,
//     buy: true,
//   },
//   {
//     symbol: 'CLOTH',
//     targetPrice: 81.70,
//     buy: false,
//   },
//
// ];


const quoteList = new QuoteList(quoteData);
const orderList = new OrderList();
// const orderList = new OrderList(orderData);
console.log("here's the order list")
// console.log(orderList);

let quoteTemplate;
let tradeTemplate;
let orderTemplate;

$(document).ready( () => {

  let bus = {}; //can trigger/subscribe to BB events
  bus = _.extend(bus, Backbone.Events);


  quoteTemplate = _.template($('#quote-template').html());
  tradeTemplate = _.template($('#trade-template').html());
  orderTemplate = _.template($('#order-template').html());

  const quotes = new QuoteList(quoteData);
  // const orders = new OrderList();

  const simulator = new Simulator({
    quotes: quotes,
  });

  // const order = new Order ({
  //   bus: bus,
  // });

// I'm making an instance of quoteListView and I'm saying that el is the quotes-container, the model to use is quoteList, which I've filled with some data, the template to use is the quote Template and the bus to use is bus (that was set up at top of document ready. )


  const quoteListView = new QuoteListView({
    el: '#quotes-container',
    model: quoteList,
    template: quoteTemplate,
    bus: bus,
  });

  const tradeHistoryView = new TradeHistoryView({
    bus: bus,
    // can I just tell it to use the quoteList here?
    template: tradeTemplate,
    el: '.trades'
  });

  const orderListView = new OrderListView({
    el: '#order-workspace',
    model: orderList,
    template: orderTemplate,
    bus: bus,
  });



  tradeHistoryView.render();

  quoteListView.render();

  orderListView.render();

  simulator.start();


});






//
