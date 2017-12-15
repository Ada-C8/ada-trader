import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';

import Simulator from 'models/simulator';
import Quote from 'models/quote'
import QuoteView from 'views/quote_view'
import QuoteList from 'collections/quote_list';
import QuoteListView from 'views/quote_list_view'
import Order from 'models/order'
import OrderList from 'collections/order_list'
import OrderView from 'views/order_view'
import OrderListView from 'views/order_list_view'


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

let bus = {}
bus = _.extend(bus, Backbone.Events)

const quoteList = new QuoteList(quoteData)

$(document).ready(() => {
  const simulator = new Simulator({
    quotes: quoteList,
  });

  const quoteTemplate = _.template($('#quote-template').html());
  const tradeTemplate = _.template($('#trade-template').html());
  const quoteListView = new QuoteListView({
    model: quoteList,
    template: quoteTemplate,
    tradeTemplate: tradeTemplate,
    el: 'main',
    bus: bus
  });



  quoteListView.render()
  simulator.start();
});
