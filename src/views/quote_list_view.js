import Backbone from 'backbone';
import QuoteView from './quote_view';
import Quote from '../models/quote';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    // save template
    this.template = params.template;
    // add bus
    this.bus = params.bus;

    // listens for changes in our template
    this.listenTo(this.model, 'update', this.render);
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
        bus: this.bus,
      });
      // Then render the  Quote and append the resulting HTML to the document
      this.$('#quotes').append(quoteView.render().$el);
    });
    return this;
  },
});

export default QuoteListView;
