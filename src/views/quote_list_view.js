import Backbone from 'backbone';

import QuoteView from './quote_view';
import Quote from '../models/quote';
import TradeHistoryView from './trade_history_view';

const QuoteListView = Backbone.View.extend({

initialize(params) {
  this.template = params.template;
  this.bus = params.bus;
  this.listenTo(this.model, 'update', this.render);

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

    this.$('select').append('<option>' + quote.get('symbol') + '</option>');


      let x = document.getElementById("symbol");
      let option = document.createElement("option");
      option.text = "kiwi";
      x.add(option, x[0]);



  }); // end each
  return this;
},

}); //end quotelistview



export default QuoteListView;





// const tradeHistoryView = new TradeHistoryView({
//   bus: this.bus,
//   template: tradeTemplate,
//   el: '.trades'
// });
//
// tradeHistoryView.render();
