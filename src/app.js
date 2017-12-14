import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

import Simulator from 'models/simulator';
// import Quote from 'models/quote';
import QuoteList from 'collections/quote_list';
import QuoteListView from 'views/quote_list_view';
import TradeListView from 'views/trade_list_view';

const eventBus = _.extend({}, Backbone.Events);

const quoteData = [
  {
    symbol: 'HUMOR',
    price: 88.50,
    bus: eventBus,
  },
  {
    symbol: 'CLOTH',
    price: 81.70,
    bus: eventBus,
  },
  {
    symbol: 'HABIT',
    price: 98.00,
    bus: eventBus,
  },
  {
    symbol: 'SUPER',
    price: 83.10,
    bus: eventBus,
  },
];


const quotes = new QuoteList(quoteData);

let quoteTemplate;
let tradeTemplate;

$(document).ready(function() {
  quoteTemplate = _.template($('#quote-template').html());

  const quoteListView = new QuoteListView({
    model: quotes,
    template: quoteTemplate,
    el: '#quotes-container',
  });

  tradeTemplate = _.template($('#trade-template').html());

  const tradeListView = new TradeListView({
    model: quotes,
    template: tradeTemplate,
    bus: eventBus,
    el: '#trades-container',
  });

  const simulator = new Simulator({
    quotes: quotes,
  });

  simulator.start();

  quoteListView.render();

});
