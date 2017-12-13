// CSS
import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

//Vendor modules
import $ from 'jquery';
import _ from 'underscore';

import Simulator from 'models/simulator';
import Quote from 'models/quote';
import QuoteList from 'collections/quote_list';
import QuoteView from './views/quote_view';
import QuoteListView from './views/quote_list_view';

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
  {
    symbol: 'HABIT',
    price: 98.00,
  },
  {
    symbol: 'SUPER',
    price: 83.10,
  },
];

// const renderList = (quoteList) => {
// Clear the unordered list
// const $quoteList = $('#quotes');
// $quoteList.empty();
// quoteList.forEach((quote) => {
//   const quoteView = new QuoteView({
//     model: quote,
//     template: _.template($('#quote-template').html()),
//     tagName: 'li',
//     className: 'quote',
//   });
//   $quoteList.append(quoteView.render().$el);
// });

// const $tradeList = $('#trade');
// $tradeList.empty();
//
// tradeList.forEach((trade) => {
//   const tradeView = new TradeView({
//     model: quote,
//     template: _.template($('#trade-template').html()),
//     tagName: 'li',
//     className: 'trade',
//   });
//   $tradeList.prepend(tradeView.render().$el);
// });
// }


$(document).ready(function() {
  let tradeTemplate = _.template($('#trade-template').html());

  let quoteTemplate = _.template($('#quote-template').html());
  // console.log(_.template($('#quote-template').html()));

  const quotes = new QuoteList(quoteData);
  const simulator = new Simulator({
    quotes: quotes,
  });
  quoteList.add(quotes);
  //
  quoteList.add(new Quote({symbol: "wtf", price: 100}));
  // console.log(quoteList)

  const quoteListView = new QuoteListView({
    el: '#quotes-container',
    model: quoteList,
    template: quoteTemplate,
    // bus: bus,
  });
  quoteListView.render();


  // quoteList.on('update', renderList, quoteList);
  simulator.start();
});
