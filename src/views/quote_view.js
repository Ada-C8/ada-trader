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

    return this;
  },

  events: {
    'click button.btn-buy': 'buy',
    'click button.btn-sell': 'sell',
  },

  buy(event) {
    let tradeData = this.model.buy();
    console.log(tradeData);
    this.bus.trigger('boughtOrSold', tradeData);
  },

  sell(event) {
    let tradeData = this.model.sell();
    console.log(tradeData);
    this.bus.trigger('boughtOrSold', tradeData);
  }
});

export default QuoteView;
