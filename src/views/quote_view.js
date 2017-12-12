import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;

    // Listen to changes in the model and call render when they occur.
    this.listenTo(this.model, "change", this.render);
  },
  render() {
    console.log(this.attributes)
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  events: {
    'click button.btn-buy': 'buyQuote',
    'click button.btn-sell': 'sellQuote',
  },
  buyQuote: function(e) {
    console.log('Buy Button Clicked');
    this.model.buy();
  },
  sellQuote: function(e) {
    console.log('Sell Button Clicked');
    this.model.sell();
  },
});

export default QuoteView;
