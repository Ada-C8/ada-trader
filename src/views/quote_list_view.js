import Backbone from 'backbone';
import _ from 'underscore';
import Quote from 'models/quote';
import QuoteList from 'collections/quote_list';
import QuoteView from 'views/quote_view';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.tradeTemplate = params.tradeTemplate;
    this.listenTo(this.model, 'update', this.renderQuote);
  },
  renderQuote() {
    this.$('#quotes').empty();

    this.model.each((quote) => {
      const quoteView = new QuoteView({
        model: quote,
        template: this.template,
        className: 'quote',
      });
      this.listenTo(quoteView, 'tradeUpdate', this.trade);
      this.$('#quotes').append(quoteView.render().$el);
    });
    return this;
  },
  trade: function(quoteView) {
    const compiledTradeTemplate = this.tradeTemplate(quoteView.model.toJSON());
    this.$('#trades').prepend(compiledTradeTemplate);
  },

});

export default QuoteListView;
