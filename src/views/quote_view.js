import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.bus, 'buy', (model) => {
    if (model) {
      this.model = model;
      this.render();
    }
  });
  },

  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);

    this.bus.trigger('quote_change', this.model);

    return this;
  },

  events: {
    'click button.btn-buy': 'buy',
    'click button.btn-sell': 'sell',
  },

  buy(event) {
    let tradeData = this.model.buy();
    this.bus.trigger('boughtOrSold', tradeData);
  },

  sell(event) {
    let tradeData = this.model.sell();
    this.bus.trigger('boughtOrSold', tradeData);
  },

  buyOrSellQuote(event) {
    let tradeItem = {
      price: this.model.get('price'),
      symbol: this.model.get('symbol'),
    }

    if (event.currentTarget.innerHTML == 'Buy') {
      tradeItem['buy'] = 'buy';
      this.bus.trigger('boughtOrSold', tradeItem);
      this.model.buy();
    } else {
      tradeItem['buy'] = 'sell';
      this.bus.trigger('boughtOrSold', tradeItem);
      this.model.sell();
    }
  },
});

export default QuoteView;
