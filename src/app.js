import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';

import Simulator from 'models/simulator';
import Quote from 'models/quote'
import QuoteView from 'views/quote_view'
import OpenOrder from 'models/open_order'
import OpenOrderView from 'views/open_order_view'
import OpenOrderList from 'collections/open_order_list'
import OpenOrderListView from 'views/open_order_list_view'
import QuoteList from 'collections/quote_list';
import QuoteListView from 'views/quote_list_view'


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
    el: 'main'
  });

  quoteListView.render()
  simulator.start();

  $('.order-entry-form').submit(function(){
    console.log('CLICK!')
    const openOrder = new OpenOrder({
      model: this.model,
      symbol: this.model.attributes.symbol,
      price: this.model.attributes.price
    })

    const openOrderView = new OpenOrderView(openOrder)

  })
});
