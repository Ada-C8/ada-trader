import Backbone from 'backbone';
import Quote from '../models/quote';

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
    'click button.btn-buy': 'buyQuote',
    'click button.btn-sell': 'sellQuote',
  },
  buyQuote: function(event) {
    this.model.set('buy', true);
    this.trigger('quoteAction', this);
    this.model.buy();
  },
  sellQuote: function(event) {
    this.model.set('buy', false);
    this.trigger('quoteAction', this);
    this.model.sell();
  },
  // checkOrders() {
  //   const symbol = this.model.get('symbol');
  //   this.bus.trigger(`check${symbol}`, this.model);
  // },
});

export default QuoteView;
