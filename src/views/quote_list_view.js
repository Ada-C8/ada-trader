import Backbone from 'backbone';
import _ from 'underscore';
import QuoteView from '../views/quote_view';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'update', this.render);
  },
  render() {
    this.$('#quotes').empty();
    // Iterate through the list rendering each Quote
    this.model.each((quote) => {
      // Create a new QuoteView with the model & template
      const quoteView = new QuoteView({
        model: quote,
        template: this.template,
        tagName: 'li',
        className: 'quote',
      });
      // Then render the QuoteView
      // And append the resulting HTML to the DOM.
      this.$('#quotes').append(quoteView.render().$el);
    });
    return this;
  }
});

export default QuoteListView;
