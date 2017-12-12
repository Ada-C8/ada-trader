import Backbone from 'backbone';
import _ from 'underscore';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'change', this.render);
  },

  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  events: {
    'click .btn-buy': 'buyQuote',
    'click .btn-sell': 'sellQuote',
  },
  buyQuote() {
    this.model.buy();
  },
  sellQuote() {
    this.model.sell();
  },
});

export default QuoteView;
