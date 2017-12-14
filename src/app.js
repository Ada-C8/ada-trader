import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
//models
import Simulator from 'models/simulator';
//collections
import TradeList from 'collections/trade_list';
import QuoteList from 'collections/quote_list';
import OrderList from './collections/order_list';
//views
import QuoteListView from 'views/quote_list_view';
import TradeListView from 'views/trade_list_view';

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
  const bus = _.extend({}, Backbone.Events);
  const quotes = new QuoteList(quoteData);
  const orderList = new OrderList;
  const simulator = new Simulator({
    quotes: quotes,
  });
  const tradeList = new TradeList();

  const quoteListView = new QuoteListView({
    model: quotes,
    template: _.template($('#quote-template').html()),
    el: 'main',
    // trades: tradeList,
    // orders: orderList,
    bus: bus,
  });
  quoteListView.render();

  const tradeListView = new TradeListView({
    model: tradeList,
    template: _.template($('#trade-template').html()),
    el: 'main',
    bus: bus,
  })
  tradeListView.render();

  quoteData.map(quote => quote.symbol).forEach((symbol) => {
    $("select[name='symbol']").append($('<option>',
    {
      value: symbol,
      text: symbol,
    }));
  });

  simulator.start();
});
