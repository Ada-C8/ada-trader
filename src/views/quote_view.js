import Backbone from 'backbone';
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
    'click button.btn-buy': 'buy',
    'click button.btn-sell': 'sell',
  },
  buy() {
    console.log('buying');
    this.model.buy();
  },
  sell() {
    console.log('selling');
    this.model.sell();
  },
});

export default QuoteView;
