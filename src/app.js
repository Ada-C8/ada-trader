// CSS
import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

//Vendor modules
import $ from 'jquery';
import _ from 'underscore';

import Simulator from 'models/simulator';
import Quote from 'models/quote';
import OpenOrder from 'models/open_order';

import QuoteList from 'collections/quote_list';
import OpenOrderList from 'collections/open_order_list';

import QuoteView from './views/quote_view';
import QuoteListView from './views/quote_list_view';
import TradeListView from './views/trade_list_view';
import OpenOrderView from './views/open_order_view';
import OpenOrderListView from './views/open_order_list_view';

// let quoteTemplate;
const quoteList = new QuoteList();
const quoteData = [
  {
    symbol: 'HUMOR',
    price: 88.50,
  },
  {
    symbol: 'CLOTH',
    price: 81.70,
  },
  // {
  //   symbol: 'HABIT',
  //   price: 98.00,
  // },
  // {
  //   symbol: 'SUPER',
  //   price: 83.10,
  // },
];


// openOrder


$(document).ready(function() {
  let bus = {};
  bus = _.extend(bus, Backbone.Events);

  let tradeTemplate = _.template($('#trade-template').html());
  let quoteTemplate = _.template($('#quote-template').html());
  let orderTemplate = _.template($('#order-template').html());

  const quotes = new QuoteList(quoteData);
  const openOrderList = new OpenOrderList()
  // const openOrder = new OpenOrder()
  const simulator = new Simulator({
    quotes: quotes,
  });

  const openOrder = new OpenOrder ({
    bus: bus,
  });


  // openOrderList.add(new OpenOrder({symbol: "WTF", price: "100"}));
  // console.log('what is my openOrderList')
  // console.log(openOrderList)

  const quoteListView = new QuoteListView({
    el: '#quotes-container',
    model: quotes,
    template: quoteTemplate,
    bus: bus,
  });

  const tradeListView = new TradeListView({
    el: '#trades-container',
    template: tradeTemplate,
    bus: bus,
  });

  // const openOrderView = new OpenOrderView({
  //   el: '#order-workspace',
  //   model: openOrderList,
  //   template: orderTemplate,
  //   bus: bus,
  // });

  const openOrderListView = new OpenOrderListView({
    el: '#order-workspace',
    model: openOrderList,
    template: orderTemplate,
    bus: bus,
  });

  // const openOrderView = new OpenOrderView({
  //   bus: bus,
  // });





  quoteListView.render();
  openOrderListView.render();
  simulator.start();
});
