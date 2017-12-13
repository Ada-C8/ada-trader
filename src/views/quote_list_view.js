import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';

import Quote from '../models/quote';
import QuoteView from '../views/quote_view';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.tradeTemplate = params.tradeTemplate;
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
      this.listenTo(quoteView, 'addTrade', this.addTrade);
      this.$('#quotes').append(quoteView.render().$el);
    });
    return this;
  },
  events: {
  },
  addTrade(quoteView) {
    const tradeTemplate = this.tradeTemplate(quoteView.model.toJSON());
    $('#trades').prepend(tradeTemplate);
  },
});

export default QuoteListView;
