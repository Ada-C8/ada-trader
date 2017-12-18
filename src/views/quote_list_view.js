import Backbone from 'backbone';
import _ from 'underscore';
import Quote from '../models/quote';
import QuoteView from '../views/quote_view';

const QuoteListView = Backbone.View.extend ({
initialize(params) {
  this.quoteTemplate = params.quoteTemplate;
  this.tradeTemplate = params.tradeTemplate;
  this.listenTo(this.model, 'update', this.render);
  this.bus = params.bus;
},
render() {
  this.$('#quotes').empty();
  //use the template
  this.model.each((quote) => {
    const quoteView = new QuoteView({
      model: quote,
      template: this.quoteTemplate,
      bus: this.bus,
      tagName: 'li',
      className: 'quote',
    });
    this.listenTo(quote, 'addQuote', this.events.seeTrade);
    this.$('#quotes').append(quoteView.render().$el);
  });


  //append template to html
  return this;
},

events: {
  seeTrade: function(data) {
    const seeTradeTemp = this.tradeTemplate(data);
    this.$('#trades').prepend(seeTradeTemp);
  }
}
});

export default QuoteListView;
