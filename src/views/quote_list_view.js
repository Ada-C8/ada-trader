import Backbone from 'backbone';
import _ from 'underscore';
import QuoteView from '../views/quote_view';
import Quote from '../models/quote';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'update', this.render);
  },
  render() {
    // Clear the unordered list
    // this.$('#quotes').empty();
    // Iterate through the list rendering each Quote
    this.model.each((quote) => {
      // Create a new QuoteView with the model & template
      const quoteView = new QuoteView({
        model: quote,
        template: this.template,
        tagName: 'li',
        className: 'quote',
        bus: this.bus
      });
      // Then render the TaskView
      // And append the resulting HTML to the DOM.
      this.$('#quotes').append(quoteView.render().$el);
    });
    return this;
  },
});


export default QuoteListView;
