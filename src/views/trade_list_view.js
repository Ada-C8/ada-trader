import Backbone from 'backbone';
import _ from 'underscore';
import QuoteView from '../views/quote_view';

const TradeListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.bus, 'boughtQuote', this.addQuote);
    this.listenTo(this.bus, 'soldQuote', this.soldQuote);
  },
  render() {
    this.$('#trades').empty();
    return this;
  },
  addQuote(quote) {
    const trade = {
      buy: true,
      symbol: quote.model.attributes.symbol,
      price: quote.model.attributes.price
    };
    this.$('#trades').prepend(this.template(trade));
  },
  soldQuote(quote) {
    const trade = {
      buy: false,
      symbol: quote.model.attributes.symbol,
      price: quote.model.attributes.price
    };
    this.$('#trades').prepend(this.template(trade));
  }
});

export default TradeListView;
