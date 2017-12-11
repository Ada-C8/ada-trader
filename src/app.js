// CSS
import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

// Vendor Modules
import $ from 'jquery';
import _ from 'underscore';

// Models
import Simulator from './models/simulator';
import QuoteList from './collections/quote_list';

// Views
import QuoteListView from './views/quote_list_view';

// Vars
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

const quoteList = new QuoteList(quoteData);
let quoteTemplate;

$(document).ready(function() {
  const simulator = new Simulator({
    quotes: quoteList,
  });

  simulator.start();

  quoteTemplate = _.template($('#quote-template').html());

  const quoteListView = new QuoteListView({
    model: quoteList,
    template: quoteTemplate,
    el: 'main'
  });

  quoteListView.render();
});
