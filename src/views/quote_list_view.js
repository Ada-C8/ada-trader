import Backbone from 'backbone';
import _ from 'underscore';
import QuoteView from '../views/quote_view';
import Quote from '../models/quote';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.tradesTemplate = params.tradesTemplate;
    this.listenTo(this.model, 'update', this.render);
  },
  render() {
    this.$('#quotes').empty();
    this.model.each((quote) => {
      const quoteView = new QuoteView({
        model: quote,
        template: this.template,
        tradesTemplate: this.tradesTemplate,
        tagName: 'li',
        className: 'quote'
      });

      this.listenTo(quoteView, 'listTrades', this.listTrades)
      this.$('#quotes').append(quoteView.render().$el);
    });
    return this;
  }, // end of render
  listTrades(quoteView){
    const compiledTradesTemplate = quoteView.tradesTemplate(quoteView.model.toJSON());
    this.$('#trades').prepend(compiledTradesTemplate);
  }

}); //end of QuoteListView

export default QuoteListView
