import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;

    this.listenTo(this.model, 'change', this.emitPriceChange);
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
  buy() {
    // const event_name = this.model.get('symbol') + '_buy';
    this.bus.trigger('bought', this.model);
    this.model.buy();
  },
  sell() {
    // const event_name = this.model.get('symbol') + '_sell';
    this.bus.trigger('sold', this.model);
    this.model.sell();
  },

  emitPriceChange() {
    const eventName = `${this.model.get('symbol').toLowerCase()}_change`;
    this.bus.trigger(eventName, this);
  },
});

export default QuoteView;
