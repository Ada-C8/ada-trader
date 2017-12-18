import Backbone from 'backbone';
import _ from 'underscore';
import QuoteView from '../views/quote_view';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.quoteTemplate = params.quoteTemplate;
    this.tradeTemplate = params.tradeTemplate;
    this.bus = params.bus;
    this.listenTo(this.model, 'update', this.render);
    this.listenTo(this.model, 'tradeMe', this.addTrade);
  },
  render() {
    this.$('#quotes').empty();
    this.$('form select').empty();
    this.model.each((quote) => {
      const quoteView = new QuoteView({
        model: quote,
        template: this.quoteTemplate,
        tagName: 'li',
        className: 'quote',
        bus: this.bus,
      });
      this.$('#quotes').append(quoteView.render().$el);
      this.$('form select').append(`<option value="${ quoteView.model.get('symbol') }">${ quoteView.model.get('symbol') }</option>`);
    });
    return this;
  },
  addTrade: function(quote) {
    const compiledTemplate = this.tradeTemplate(quote.toJSON());
    this.$('#trades').prepend(compiledTemplate);
  },
});

export default QuoteListView;
