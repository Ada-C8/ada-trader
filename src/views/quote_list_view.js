import Backbone from 'backbone';
import _ from 'underscore';

import QuoteView from './quote_view';
import Quote from '../models/quote';
import TradeHistoryView from './trade_history_view';

const QuoteListView = Backbone.View.extend({

initialize(params) {
  this.template = params.template;
  this.bus = params.bus;
},
render(){
  this.$('.quotes').empty();
  this.model.each((quote) => {
    const quoteView = new QuoteView({
      model: quote,
      template: this.template,
      tagName: 'li',
      className: 'quote',
      bus: this.bus,
    }); // end quoteView const

    this.$('.quotes').append(quoteView.render().$el);

    let x = document.getElementById("symbol");
    let option = document.createElement("option");
    option.text = quote.get('symbol');
    x.add(option);


  }); // end each
  console.log(this.model);
  this.bus.trigger('send_quotes', this.model)
  return this;
},

// getQuote(order){
//   console.log("It's the get quote method!!!");
//   // this.symbol = symbol;
//   console.log(this.order.get('symbol'));
//   console.log("I just console logged order")
//   console.log(this);
//   console.log("i just consolelogged this")
//   // let x = _.findWhere(this.model, {symbol = })
//   // let currentPrice = this.model.
// },
// setModel(trade_data) {
//   this.data = trade_data;
//   this.render();
// },

}); //end quotelistview



export default QuoteListView;





// const tradeHistoryView = new TradeHistoryView({
//   bus: this.bus,
//   template: tradeTemplate,
//   el: '.trades'
// });
//
// tradeHistoryView.render();
