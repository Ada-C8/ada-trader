import Backbone from 'backbone';
import QuoteView from '../views/quote_view';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.tradeTemplate = params.tradeTemplate;
    this.listenTo(this.model, 'update', this.render);
  },
  render() {
    this.$('#quotes').empty();
    this.model.each((quote) => {
      const quoteView = new QuoteView({
        model: quote,
        template: this.template,
        tagName: 'li',
        className: 'quote',
      });
    this.listenTo(quote, 'addTrade', this.events.showTrade);
    this.$('#quotes').append(quoteView.render().$el);
  });

  return this;
},
  events: {
    showTrade: function(data) {
      const showTradeTemplate = this.tradeTemplate(data);
      this.$('#trades').prepend(showTradeTemplate);
    }
  }
});

export default QuoteListView;
