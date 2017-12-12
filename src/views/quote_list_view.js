import Backbone from 'backbone';
import _ from 'underscore';
import QuoteView from '../views/quote_view';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.tradeTemplate = params.tradeTemplate;
    this.bus = params.bus;
    this.listenTo(this.model, 'update', this.render);
  },
  render() {
    this.$('#quotes').empty();
    this.model.each((quote) => {
      const quoteView = new QuoteView({
        model: quote,
        template: this.template,
        orderTemplate: this.orderTemplate,
        tagName: 'li',
        className: 'task',
      })
      this.listenTo(quoteView, 'showTrade', this.showTrade)
      this.$('#quotes').append(quoteView.render().$el);
    });
    return this;
  },
  showTrade: function(quoteView) {
    const compiledTradeTemplate = this.tradeTemplate(quoteView.model.toJSON());
    this.$('#trades').prepend(compiledTradeTemplate);
  }
})

export default QuoteListView;
