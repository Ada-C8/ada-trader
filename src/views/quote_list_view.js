import Backbone from 'backbone';
// import _ from 'underscore';
// import Quote from '../models/quote';
import QuoteView from './quote_view';


const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.tradeTemplate = params.tradeTemplate;
    this.bus = params.bus;
    this.listenTo(this.model, 'update', this.render);
  },
  render() {
    this.model.each( (quote) => {
      const quoteView = new QuoteView({
        model: quote,
        template: this.template,
        bus: this.bus,
        tagName: 'li',
        className: 'quote',
      });
      this.listenTo(quoteView, 'quoteAction', this.trade);
      this.$('#quotes').append(quoteView.render().$el);
    });
    return this;
  },
  trade: function(quoteView) {
    const tradeTemplate = this.tradeTemplate(quoteView.model.toJSON());
    this.$('#trades').prepend(tradeTemplate);
  },
});

export default QuoteListView;
