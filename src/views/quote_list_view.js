import Backbone from 'backbone';
import QuoteView from './quote_view';
import Quote from '../models/quote';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    // save template
    this.template = params.template;
  },

  render() {
    // Clear the DOM Elements so we can redraw them
    this.$('#quotes').empty();

    // Iterate through the list rendering each quote
    this.model.each((quote) => {
      // create a new QuoteView with the model and template
      const quoteView = new QuoteView({
        model: quote,
        template: this.template,
        tagName: 'li',
        className: 'quote',
      });
      // Then render the  Quote and append the resulting HTML to the document
      this.$('#quotes').append(quoteView.render().$el);
    });
    console.log(`in the end of the quote list view render function`);
    return this;
  },
});

export default QuoteListView;
