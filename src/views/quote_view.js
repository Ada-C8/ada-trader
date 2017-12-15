import Backbone from 'backbone';
import Quote from '../models/quote'

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, "change", this.render);
  },
  render() {
    const compiledTemplate = this.template(this.model.attributes);
    this.$el.html(compiledTemplate);
    return this;
  },
  events: {
    'click button.btn-buy': 'buyQuote',
    'click button.btn-sell': 'sellQuote'
  },
  buyQuote: function(e) {
    this.model.set('buy', true);
    this.bus.trigger('tradeMe', this.model);
    this.model.buy();
  },
  sellQuote: function(e) {
    this.model.set('buy', false);
    this.bus.trigger('tradeMe', this.model);
    this.model.sell();
  }
});

export default QuoteView;
