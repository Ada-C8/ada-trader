import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
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
  buyQuote: function(event) {
    this.model.buy();
    this.trigger('tradeMe', this);
  },
  sellQuote: function(event) {
    this.model.sell();
    this.trigger('tradeMe', this);
  },
});

export default QuoteView;
