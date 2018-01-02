import Backbone from 'backbone';
//import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'change', this.alertPriceChange);
    this.listenTo(this.bus, 'buyOrder', this.buyOrder);
    this.listenTo(this.bus, 'sellOrder', this.sellOrder);
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  alertPriceChange() {
    this.bus.trigger('priceChange', {symbol: this.model.get('symbol'), currentPrice: this.model.get('price')});
  },
  events: {
    'click button.btn-buy': 'buyQuote',
    'click button.btn-sell': 'sellQuote'
  },
  buyQuote: function() {
    this.trigger('buy', this);
    this.model.buy();
  },
  sellQuote: function() {
    this.trigger('sell', this);
    this.model.sell();
  },
  buyOrder: function(changeInfo) {
    if (this.model.get(`symbol`) === changeInfo.quote.symbol && this.model.get('price') <= changeInfo.quote.currentPrice) {
      this.trigger('buy', this);
      this.model.buy();
      changeInfo.model.destroy();
    }
  },
  sellOrder: function(changeInfo) {
    if (this.model.get(`symbol`) === changeInfo.quote.symbol && this.model.get('price') >= changeInfo.quote.currentPrice) {
      this.trigger('sell', this);
      this.model.sell();
      changeInfo.model.destroy();
    }
  }
})

export default QuoteView;
