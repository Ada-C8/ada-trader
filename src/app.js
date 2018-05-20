import 'foundation-sites/dist/foundation.css';
import 'css/app.css';


import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

import Simulator from 'models/simulator';
import QuoteList from 'collections/quote_list';
// import LimitOrder from 'models/LimitOrder';
import QuoteListView from './views/quote_list_view';
import MarketOrder from 'collections/market_order';
import MarketOrderView from './views/market_order_view';
import LimitOrderList from './collections/limit_order_list';
import LimitOrderListView from './views/limit_order_list_view';

let quoteTemplate;
let tradeTemplate;
let orderTemplate;
let dropdownTemplate;

let hamRadio = {};
hamRadio = _.extend(hamRadio, Backbone.Events);

// const quoteList = new QuoteList();
const quoteData = [
  {
    symbol: 'ETHEREUM',
    price: 88.50,
  },
  {
    symbol: 'ZCOIN',
    price: 81.70,
  },
  {
    symbol: 'BITCOIN',
    price: 98.00,
  },
  {
    symbol: 'LITECOIN',
    price: 83.10,
  },
];

// const renderOrderDropdown =  function renderOrderDropdown(event){
//   const dropdownElement = $('#dropdown');
//   console.log('banana');
//   dropdownElement.html('');
//   console.log(event);
//   console.log('this is event');
//   event.forEach( (symbol) => {
//     let generatedHTML = dropdownTemplate({symbol: symbol});
//     dropdownElement.append(generatedHTML);
//   });
// };

$(document).ready(function() {
  quoteTemplate = _.template($('#quote-template').html());
  tradeTemplate = _.template($('#trade-template').html());
  orderTemplate = _.template($('#order-template').html());
  dropdownTemplate = _.template($('#dropdown-symbol').html());
  // hamRadio.listenTo(hamRadio, 'render_order_dropdown', renderOrderDropdown);

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

  // const limitOrder = new LimitOrder();
  const limitOrderList = new LimitOrderList();
  console.log(limitOrderList);
  console.log('limit order list up there^^^');
  const limitOrderListView = new LimitOrderListView({
    el:'#order-workspace',
    model: limitOrderList,
    template: orderTemplate,
    // dropdownTemplate: dropdownTemplate,
    hamRadio: hamRadio,
  });

  quoteListView.render();
  simulator.start();
});
