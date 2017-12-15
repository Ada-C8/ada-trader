// views/quote_view

import Backbone from 'backbone';
import Quote from '../models/quote';
import Trade from '../models/trade';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.tradeTemplate = params.tradeTemplate;
    this.bus = params.bus
    this.listenTo(this.model, "change", this.render);
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  events: {
    'click button.btn-buy': 'buyQuote',
    'click button.btn-sell': 'sellQuote',
  },
  buyQuote: function(e) {
    const newTrade = new Trade({
      symbol: this.model.get('symbol'),
      price: this.model.get('price'),
      buy: true,
      bus: this.bus,
    });
    this.model.buy();
    this.bus.trigger('newTrade', newTrade);

  },
  sellQuote: function(e) {
    const newTrade = new Trade({
      symbol: this.model.get('symbol'),
      price: this.model.get('price'),
      buy: false,
      bus: this.bus,
    });
    this.model.sell();
    this.bus.trigger('newTrade', newTrade);
  }

});

export default QuoteView;
