import Backbone from 'backbone';
import _ from 'underscore';
import QuoteView from '../views/quote_view';
import Quote from '../models/quote'

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template,
    this.listenTo(this.model, "change", this.render)
  },
  render() {
    this.$('#quotes').empty();
    this.model.each((quote) => {
      const quoteView = new QuoteView ({
        model: quote,
        template: this.template,
        tradeTemplate: this.tradeTemplate,
        tagName: 'li',
        className: 'quote'
      })
      this.listenTo(quoteView, 'appendTrade', this.appendTrade)
      this.$('#quotes').append(quoteView.render().$el);
    })
    return this
  },

  appendTrade(quoteView) {
    const compiledTradeTemplate = this.tradeTemplate(quoteView.model.toJSON());
    this.$('#trades').prepend(compiledTradeTemplate);
  }


})

export default QuoteListView;
