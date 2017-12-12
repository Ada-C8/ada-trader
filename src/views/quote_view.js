import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;

    this.listenTo(this.model, 'change', this.priceChange);
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
    this.model.buy();
    this.bus.trigger('bought', this.model)
  },
  sell() {
    // const event_name = this.model.get('symbol') + '_sell';
    this.model.sell();
    this.bus.trigger('sold', this.model)
  },

  priceChange() {
    const event_name = this.model.get('symbol') + '_change';
    this.bus.trigger(event_name, this.model);
  },
});

export default QuoteView;
