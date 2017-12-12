import Backbone from 'backbone';
import _ from 'underscore';
import QuoteView from './quote_view';
import Quote from '../models/quote';

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
        tradeTemplate: this.tradeTemplate,
        tagName: 'li',
        className: 'quote',
      });
      this.listenTo(quoteView, 'buy', this.displayBuy)

      this.$('#quotes').append(quoteView.render().$el);

    });
    return this;
  },
  displayBuy(quoteView) {
    this.$('#trades').append(this.tradeTemplate({buy: true, symbol: quoteView.model.get('symbol'), price: quoteView.model.get('price')}))
  }
});

export default QuoteListView;
