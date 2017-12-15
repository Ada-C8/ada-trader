import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import QuoteView from '../views/quote_view';
import Quote from '../models/quote';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.quotesTemplate;
    this.listenTo(this.model, 'update', this.render);
  },
  render() {
    this.model.each((quote) => {
      const quoteView = new QuoteView({
        model: quote,
        template: this.template,
        tagName: 'li',
        className: 'quote',
      });
      this.listenTo(quoteView, 'addTrade', this.prependTrades);
      this.$('#quotes').append(quoteView.render().$el);
    });
    return this;
  },
  prependTrades: function(quoteView){
    const tradeTemplate = _.template($('#trade-template').html());
    this.$('#trades').prepend(tradeTemplate(quoteView.model.attributes));
  },
});

export default QuoteListView;
