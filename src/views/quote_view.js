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
    const newBoughtTrade = new Trade({
      symbol: this.model.get('symbol'),
      price: this.model.get('price'),
      buy: true,
      bus: this.bus,
      id: 'bought',
    });
    this.bus.trigger('newTrade', newBoughtTrade);
    this.model.buy();

  },
  sellQuote: function(e) {
    const newSoldTrade = new Trade({
      symbol: this.model.get('symbol'),
      price: this.model.get('price'),
      buy: false,
      bus: this.bus,
      id: 'sold',
    });
    this.bus.trigger('newTrade', newSoldTrade);
    this.model.sell();
  }

});

export default QuoteView;
