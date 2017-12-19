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

}); //end quotelistview



export default QuoteListView;



// tradeHistoryView.render();
