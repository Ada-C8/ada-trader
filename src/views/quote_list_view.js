import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import QuoteView from '../views/quote_view';
import Quote from '../models/quote';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.bus = params.bus;
    this.template = params.quotesTemplate;
    this.listenTo(this.bus, 'tradeMe', this.tradeOrders);
    this.listenTo(this.model, 'update', this.render);
  },
  render() {
    this.model.each((quote) => {
      const quoteView = new QuoteView({
        model: quote,
        template: this.template,
        tagName: 'li',
        className: 'quote',
        bus: this.bus,
      });
      this.listenTo(quoteView, 'addTrade', this.prependTrades);
      this.$('#quotes').append(quoteView.render().$el);
    });
    return this;
  },
  prependTrades: function(quoteView){
    // console.log('in prependTrades');
    const tradeTemplate = _.template($('#trade-template').html());
    this.$('#trades').prepend(tradeTemplate(quoteView.model.attributes));
  },
  tradeOrders(quote) {
    // console.log('in trade orders');
    const tradeQuoteView = new QuoteView({
      model: quote,
      template: this.template,
      tagName: 'li',
      className: 'quote',
      bus: this.bus,
    });
    this.prependTrades(tradeQuoteView);
  }
});

export default QuoteListView;
