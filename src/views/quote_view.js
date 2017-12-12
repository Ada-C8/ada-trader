import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'change', this.render);
  },
  render() {
    const compileTemplate = this.template(this.model.toJSON());
    this.$el.html(compileTemplate);
    return this;
  },
  events: {
    'click button.btn-buy': 'buyQuote',
    'click button.btn-sell': 'sellQuote'
  },
  buyQuote: function(e) {
    this.model.buy();
  },
  sellQuote: function(e) {
    this.model.sell();
  },

});

export default QuoteView;
