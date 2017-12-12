import Backbone from 'backbone';
import _ from 'underscore';
import Quote from '../models/quote';
import QuoteView from '../views/quote_view';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.tradeTemplate = params.tradeTemplate;
    this.listenTo(this.model, 'update', this.render);
  },
  render() {
    // Clear the unordered list
    this.$('#quotes').empty();
    // Iterate through the list rendering each quote
    this.model.forEach((quote) => {
      // Create a new QuoteView with the model & template
      const quoteView = new QuoteView({
        model: quote,
        template: this.template,
        tagName: 'li',
        className: 'quote',
      });
      // Then render the QuoteView
      // And append the resulting HTML to the DOM.
      this.listenTo(quoteView, 'clickedBuyOrSellQuote', this.showTrade);
      this.$('#quotes').append(quoteView.render().$el);
    });
    return this;
  },
  showTrade: function(quoteView) {
    console.log('SHOW QUOTE BOUGHT');
    const compiledTradeTemplate = this.tradeTemplate(quoteView.model.toJSON());
    this.$('#trades').prepend(compiledTradeTemplate);
  },
});

export default QuoteListView;
