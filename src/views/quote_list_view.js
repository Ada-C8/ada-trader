import Backbone from 'backbone';
import QuoteView from './quote_view';
//import Quote from '../models/quote';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.tradeTemplate = params.tradeTemplate;
    this.orderList = params.orderList;
    this.listenTo(this.model, 'update', this.render);
    this.bus = params.bus;
  },
  render() {
    this.$('#quotes').empty();
    this.$('select').empty();
    this.model.each((quote) => {
      const quoteView = new QuoteView({
        model: quote,
        template: this.template,
        tradeTemplate: this.tradeTemplate,
        bus: this.bus,
        tagName: 'li',
        className: 'quote',
      });
      this.listenTo(quoteView, 'buy', this.displayBuy);

      this.listenTo(quoteView, 'sell', this.displaySell);

      this.listenTo(quoteView, 'priceChange', this.alertPriceChange);

      this.$('#quotes').append(quoteView.render().$el);

      this.$('select').append(`<option>${quote.get('symbol')}</option>`)


    });
    return this;
  },
  displayBuy(quoteView) {
    this.$('#trades').prepend(this.tradeTemplate({buy: true, symbol: quoteView.model.get('symbol'), price: quoteView.model.get('price')}))
  },
  displaySell(quoteView) {
    this.$('#trades').prepend(this.tradeTemplate({buy: false, symbol: quoteView.model.get('symbol'), price: quoteView.model.get('price')}))
  },
  alertPriceChange(changeInfo) {
    this.trigger('priceChange', changeInfo);
  }
});

export default QuoteListView;
