import Backbone from 'backbone';

const TradeListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.bus, 'boughtQuote', this.addBoughtQuote);
    this.listenTo(this.bus, 'soldQuote', this.addSoldQuote);
    this.listenTo(this.bus, 'boughtLimitOrder', (quote) => {
      this.addBoughtLimitQuote(quote);
    });
    this.listenTo(this.bus, 'soldLimitOrder', (quote) => {
      this.addSoldLimitQuote(quote);
    });
  },
  render() {
    this.$('#trades').empty();
    return this;
  },
  addBoughtQuote(quote) {
    const trade = {
      buy: true,
      symbol: quote.model.attributes.symbol,
      price: quote.model.attributes.price
    };
    this.$('#trades').prepend(this.template(trade));
  },
  addBoughtLimitQuote(quote) {
    const trade = {
      buy: true,
      symbol: quote.attributes.symbol,
      price: quote.attributes.targetPrice,
    };
    this.$('#trades').prepend(this.template(trade));
  },
  addSoldQuote(quote) {
    const trade = {
      buy: false,
      symbol: quote.model.attributes.symbol,
      price: quote.model.attributes.price,
    };
    this.$('#trades').prepend(this.template(trade));
  },
  addSoldLimitQuote(quote) {
    const trade = {
      buy: false,
      symbol: quote.attributes.symbol,
      price: quote.attributes.targetPrice,
    };
    this.$('#trades').prepend(this.template(trade));
  },
});

export default TradeListView;
