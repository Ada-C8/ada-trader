import Backbone from 'backbone';

import QuoteView from './quote_view';
import Quote from '../models/quote';
import TradeHistoryView from './trade_history_view';

const QuoteListView = Backbone.View.extend({
// this initialize takes what we defined in app.js
// so it sets the template and bus for this view to the ones define in app.js
// in this case the quote template and the bus we created.
// it will listen to this model, which is the one we set up -- new quoteList with seed data
initialize(params) {
  this.template = params.template;
  this.bus = params.bus;
  this.listenTo(this.model, 'update', this.render);

},
render(){
  // console.log("IN the quote list view render function");
  this.$('.quotes').empty();
// for this model (quoteList), take each quote and create a quote view instance by sending in these params. Our model here is quote.
  this.model.each((quote) => {
    const quoteView = new QuoteView({
      model: quote,
      template: this.template,
      tagName: 'li',
      className: 'quote',
      bus: this.bus,
    }); // end quoteView const
    console.log("Created quoteView for " + quoteView);
    this.$('.quotes').append(quoteView.render().$el);
    console.log("appended the rendered view")

    // console.log(quote.get('symbol'));

    // this.$('#symbol').append('<option>' + quote.get('symbol') + '</option>');

    // this.$('h3#testings').append('I am the greatest of all time!!!');

      // let x = document.getElementById("symbol");
      // let option = document.createElement("option");
      // option.text = quote.get('symbol');
      // x.add(option);

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
