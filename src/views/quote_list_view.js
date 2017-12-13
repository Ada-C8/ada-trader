import Backbone from 'backbone';
import _ from 'underscore';
import QuoteView from '../views/quote_view';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.quoteTemplate = params.quoteTemplate;
    this.tradeTemplate = params.tradeTemplate;
    this.listenTo(this.model, 'update', this.render);
  },
  render() {
    this.$('#quotes').empty();
    this.model.each((quote) => {
      const quoteView = new QuoteView({
        model: quote,
        template: this.quoteTemplate,
        tagName: 'li',
        className: 'quote',
      });
      this.listenTo(quoteView, 'tradeMe', this.addTrade);
      this.$('#quotes').append(quoteView.render().$el);
    });
    return this;
  },
  addTrade: function(quoteView) {
    const compiledTemplate = this.tradeTemplate(quoteView.model.toJSON());
    this.$('#trades').prepend(compiledTemplate);
  },
});

export default QuoteListView;
