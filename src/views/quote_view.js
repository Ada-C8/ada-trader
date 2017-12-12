import Backbone from 'backbone';
import Trade from '../models/trade';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.trades = params.trades;
    this.listenTo(this.model, "change", this.render);
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  events: {
    'click .btn-buy': 'buyQuote',
    'click .btn-sell': 'sellQuote',
  },
  buyQuote() {
    const trade = new Trade({
      symbol: this.model.get('symbol'),
      buy: true,
      price: this.model.get('price'),
    });
    this.trades.add(trade);
    this.model.buy();
  },
  sellQuote() {
    const trade = new Trade({
      symbol: this.model.get('symbol'),
      buy: false,
      price: this.model.get('price'),
    });
    this.trades.add(trade);
    this.model.sell();
  },
});

export default QuoteView;
