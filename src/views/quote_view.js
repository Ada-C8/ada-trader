import Backbone from 'backbone';
import Trade from '../models/trade';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'change', this.render);
  },

  render() {
    // why JSON?
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },

  events: {
    'click .btn-buy': 'buyQuote',
    'click .btn-sell': 'sellQuote',
  },

  buyQuote() {
    this.model.buy();
    const trade = new Trade({
      symbol: this.model.get('symbol'),
      buy: true,
      price: this.model.get('price'),
    });
    this.bus.trigger('addTrade', trade);
  },

  sellQuote() {
    this.model.sell();
    const trade = new Trade({
      symbol: this.model.get('symbol'),
      buy: false,
      price: this.model.get('price'),
    });
    this.bus.trigger('addTrade', trade);
  },
});

export default QuoteView;
