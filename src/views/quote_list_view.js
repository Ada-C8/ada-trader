import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';

import Quote from '../models/quote';
import Order from '../models/order';
import QuoteView from '../views/quote_view';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.tradeTemplate = params.tradeTemplate;
    this.bus = params.bus,

    this.listenTo(this.model, 'update', this.render);
    this.listenTo(this.bus, 'addTrade', this.addTrade);
  },
  render() {
    // clear unordered list
    this.$('#quotes').empty();

    this.model.each((quote) => {
      const quoteView = new QuoteView({
        model: quote,
        bus: this.bus,
        template: this.template,
        tagName: 'li',
        className: 'quote',
      });
      // this.listenTo(quoteView, 'addTrade', this.addTrade);
      this.$('#quotes').append(quoteView.render().$el);
    });
    return this;
  },
  events: {
  },
  addTrade(quote) {
    // const tradeTemplate = this.tradeTemplate(quoteView.model.toJSON());
    console.log('existing quote');
    console.log(quote);
    const tradeTemplate = this.tradeTemplate(quote.toJSON());
    $('#trades').prepend(tradeTemplate);
  },
});

export default QuoteListView;
