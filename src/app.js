import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';

import Simulator from 'models/simulator';
import QuoteList from 'collections/quote_list';

import Quote from './models/quote';
// import TaskList from './collections/task_list';
import QuoteView from './views/quote_view';
// import TaskListView from './views/task_list_view';
import QuoteListView from './views/quote_list_view';


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

const quoteList = new QuoteList();
let quoteTemplate;

$(document).ready(function() {
  quoteTemplate = _.template($('#quote-template').html());

  const quotes = new QuoteList(quoteData);
  const simulator = new Simulator({
    quotes: quotes,
  });

  // Tasklistview will encompass the main tag
  const quoteListView = new QuoteListView({
    el: 'main',
    model: quotes,
    template: quoteTemplate,
  });

  quoteListView.render();

  // wave 3
  // any time the stock "changes" change event on model
  simulator.start();
});
