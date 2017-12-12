import Backbone from 'backbone';
import _ from 'underscore';

import Quote from '../models/quote';
import QuoteView from '../views/quote_view';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'update', this.render);
  },
  render() {
    // clear unordered list
    this.$('#quotes').empty();

    this.model.each((quote) => {
      const quoteView = new QuoteView({
        model: quote,
        template: this.template,
        tagName: 'li',
        className: 'quote',
      });
      this.$('#quotes').append(quoteView.render().$el);
    });
    return this;
  },
  events: {
  },
});

export default QuoteListView;
