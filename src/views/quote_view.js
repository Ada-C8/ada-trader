import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;

    this.listenTo(this.model, 'change', this.render);
  },
  render() {
    console.log('I rendered');
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate)

    return this;
  },
  events: {
    'click button.btn-buy': 'buyQuote',
    'click button.btn-sell': 'sellQuote',
  },
  buyQuote(event) {
    console.log('clicked into buyQuote');
    console.log('this = ');
    console.log(this);
    console.log('this.model = ');
    console.log(this.model);

    this.model.buy()
  },
  sellQuote(event) {
    console.log('clicked into sellQuote');
    this.model.sell()
  }
});

export default QuoteView;
