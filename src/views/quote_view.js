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
    'click button.buy': 'buy'
//     'click button.delete': 'deleteTask',
  },
  buy(event) {
    this.model.buy();
//logic to buy this.model.
  },
  sellQuote(event) {
    //logic to sell this.model.
  },
});

export default QuoteView;
