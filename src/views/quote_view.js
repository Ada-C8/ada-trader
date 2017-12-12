import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;

    // listen to changes in model and render
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
  buyQuote: function(e) {
    console.log(this.model);
    this.model.buy();
  },
  sellQuote: function(e) {
    this.model.sell();
    console.log(this.model);
  },
});

export default QuoteView;
