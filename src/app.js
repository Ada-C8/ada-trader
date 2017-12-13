import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';

import Simulator from 'models/simulator';
import QuoteList from 'collections/quote_list';
import Quote from 'models/quote';
import QuoteView from './views/quote_view';
import QuoteListView from './views/quote_list_view';
import TradeHistoryView from './views/trade_history_view';

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

// const quoteList = new QuoteList();
let quoteTemplate;

//MOVED THIS TO QUOTELISTVIEW

// const renderList = function(quoteList) {
//   const $quoteList = $('#quotes');
//   $quoteList.empty();
//
//   quoteList.forEach((quote) =>{
//
//     const quoteView = new QuoteView({
//       model: quote,
//       template: _.template($('#quote-template').html()),
//       tagName: 'li',
//       className: 'quote',
//     });
//     // THESE ARE THE THINGS THAT BACKBONE EXPECTS except for template, which is why we initialized template.
//
//     $quoteList.append(quoteView.render().$el);
//
//
//
//     // const taskHtml = $(taskTemplate(task.attributes));
//     // $taskList.append(taskHtml);
//     //
//     // taskHtml.find('.delete').click({task: task}, (params) => {
//     //   const task = params.data.task;
//     //   taskList.remove(task);
//     //   updateStatusMessageWith(`The task "${task.get('task_name')}" has been deleted`)
//     // });
//     //
//     // taskHtml.on('click', '.toggle-complete', {task: task}, function(params) {
//     //   params.data.task.set('is_complete', !params.data.task.get('is_complete'));
//     //   $(this).closest('.task').toggleClass('is-complete')
//     // });
//   });
// }

const renderTradeHistory = function() {
  // const $quoteList = $('#quotes');
  // $quoteList.empty();
  //
  // quoteList.forEach((quote) =>{
  //
  //   const quoteView = new QuoteView({
  //     model: quote,
  //     template: _.template($('#quote-template').html()),
  //     tagName: 'li',
  //     className: 'quote',
  //   });
  //   // THESE ARE THE THINGS THAT BACKBONE EXPECTS except for template, which is why we initialized template.
  //
  //   $quoteList.append(quoteView.render().$el);
};

$(document).ready(function() {
  let bus = {};

  bus = _.extend(bus, Backbone.Events);

  const quotes = new QuoteList(quoteData);
  const simulator = new Simulator({
    quotes: quotes,
  });
  // const $quoteList = $('#quotes');
  //
  // const quoteView = new QuoteView({
  //   model: quotes.at(0),
  //   template: _.template($('#quote-template').html()),
  //   tagName: 'li',
  //   className: 'quote',
  // });
  // THESE ARE THE THINGS THAT BACKBONE EXPECTS except for template, which is why we initialized template.

  // $quoteList.append(quoteView.render().$el);


  simulator.start();

  // renderList(quotes);

  quoteTemplate = _.template($('#quote-template').html());

  const quoteListView = new QuoteListView({
    el: '#quotes',
    model: quotes,
    template: quoteTemplate,
    tradeTemplate:  _.template($('#trade-template').html()),
    bus: bus,
  });

  quoteListView.render();

  // const quoteView = new QuoteView({
  //   el: 'ul',
  //   model: quote,
  //   template: quoteTemplate,
  // });
  //
  // quoteView.render();
});
