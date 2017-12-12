import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({

  initialize(params) {
    // use #quote-template
    this.template = params.template;
    // any time the stock "changes" change event on model
    this.listenTo(this.model, 'change', this.render);
  },
  events: {
    'click button.btn-buy': 'buyQuote',
    'click button.btn-sell': 'sellQuote',
  },
  buyQuote() {
    this.model.buy();
  },
  sellQuote() {
    this.model.sell();
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },

//   Click the Buy button for a quote:
// That quote's market price increases by $1.00
// Click the Sell button for a quote:
// That quote's market price decreases by $1.00


});

export default QuoteView;
