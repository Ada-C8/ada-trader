import Backbone from 'backbone';
// import _ from 'underscore';
import QuoteView from '../views/quote_view';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.tradeTemplate = params.tradeTemplate;
    this.listenTo(this.model, 'update', this.render);
    this.bus = params.bus;
  },
  render() {
    this.$('#quotes').empty();
    this.$('select[name=symbol]').empty();

    this.model.each((quote) => {
      const quoteView = new QuoteView({
        model: quote,
        template: this.template,
        bus: this.bus,
        tagName: 'li',
        className: 'task',
      })
      this.$('select[name=symbol]').append(`<option value="${quote.get('symbol')}">${quote.get('symbol')}</option>`);
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
