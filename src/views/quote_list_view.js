import Backbone from 'backbone';
import _ from 'underscore';
import QuoteView from '../views/quote_view';
import Quote from '../models/quote'

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.quoteTemplate = params.quoteTemplate,
    this.tradeTemplate = params.tradeTemplate,
    this.listenTo(this.model, "change", this.render)
    this.model.forEach((quote)=> {
      this.listenTo(quote, 'appendTrade', this.appendTrade)
    })
  },
  render() {
    this.$('#quotes').empty();
    this.model.each((quote) => {
      const quoteView = new QuoteView ({
        model: quote,
        template: this.quoteTemplate,
        tagName: 'li',
        className: 'quote'
      })
      console.log("IN RENDER QUOTE LIST VIEW")
      this.$('#quotes').append(quoteView.render().$el);
    })
    return this
  },

  appendTrade(data) {
    const compiledTradeTemplate = this.tradeTemplate(data);
    this.$('#trades').prepend(compiledTradeTemplate);
    console.log("IN APPEND")
  },

})

export default QuoteListView;
