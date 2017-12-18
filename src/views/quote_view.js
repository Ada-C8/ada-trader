import Backbone from 'backbone';
import Trade from '../models/trade';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'change', this.render);
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
      buy: true,
      price: this.model.get('price'),
      symbol: this.model.get('symbol'),
    });

    this.bus.trigger('addTrade', trade);
    this.model.buy();
  },

  sellQuote() {
    const trade = new Trade({
      buy: false,
      price: this.model.get('price'),
      symbol: this.model.get('symbol'),
    });

    this.bus.trigger('addTrade', trade);
    this.model.sell();
  },
});

export default QuoteView;
