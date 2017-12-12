import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template,
    this.listenTo(this.model, 'change', this.render) // when a model changes, it will re-render
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
  buy(event) {
    console.log(event);
    this.model.buy();
  },
  sell(event) {
    console.log(event);
    this.model.sell();
  }

});

export default QuoteView;
