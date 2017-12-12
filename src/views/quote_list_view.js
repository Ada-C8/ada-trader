import Backbone from 'backbone';
import _ from 'underscore';
import Quote from '../models/quote';
import QuoteView from '../views/quote_view';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    console.log('INSIDE initialize');
    this.template = params.template;
    this.listenTo(this.model, 'update', this.render);
    console.log(this.model);
  },
  render() {
    console.log('In Render');
    // Clear the unordered list
    this.$('#quotes').empty();
    // Iterate through the list rendering each quote
    this.model.forEach((quote) => {
      console.log('ITERATING THROUGH RENDER')
      console.log(quote)
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
