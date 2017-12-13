import Backbone from 'backbone';
import Quote from '../models/quote';
import Simulator from '../models/simulator';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model,'change', this.render);
  },
  events: {
    'click .btn-buy': 'buyQuote',
    'click .btn-sell': 'sellQuote',
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    // this.$('#quotes').html(compiledTemplate);
    return this;
  },
  buyQuote: function(e) {
    // console.log('clicked Buy button');
    this.model.set('price', this.model.buy());
  },
  sellQuote: function(e) {
    this.model.set('price', this.model.sell());
  }
});

export default QuoteView;
