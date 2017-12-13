import 'foundation-sites/dist/foundation.css';
import 'css/app.css';


import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

import Simulator from 'models/simulator';
import QuoteList from 'collections/quote_list';
import QuoteListView from './views/quote_list_view';
import MarketOrder from 'collections/market_order';
import MarketOrderView from './views/market_order_view';

let quoteTemplate;
let tradeTemplate;

let hamRadio = {};
hamRadio = _.extend(hamRadio, Backbone.Events);

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
  quoteTemplate = _.template($('#quote-template').html());
  tradeTemplate = _.template($('#trade-template').html());

  const quotes = new QuoteList(quoteData);
  console.log(quotes);
  console.log('those are quotes');
  const simulator = new Simulator({
    quotes: quotes,
  });
  const quoteListView = new QuoteListView({
    el: 'main',
    model: quotes,
    template: quoteTemplate,
    hamRadio: hamRadio,
  });

  const marketOrder = new MarketOrder();
  console.log(marketOrder);
  console.log('that is the market order^^^^');
  const marketOrderView = new MarketOrderView({
  el:'main',
  model: marketOrder,
  template: tradeTemplate,
  hamRadio: hamRadio,
  });
  quoteListView.render();

  simulator.start();
});
