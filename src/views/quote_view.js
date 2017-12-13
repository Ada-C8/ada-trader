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
    'click button.btn-buy': 'buyQuote',
    'click button.btn-sell': 'sellQuote',
  },

  buyQuote(event) {
    console.log('buying quote');
    this.model.buy();
    const quote = {
      price: this.model.get('price'),
      symbol: this.model.get('symbol'),
      buy: true,
    }
    this.trigger('add_trade', quote);
  },

  sellQuote(event) {
    console.log('selling quote');
    this.model.sell();
    const quote = {
      price: this.model.get('price'),
      symbol: this.model.get('symbol'),
      buy: false,
    }
    this.trigger('add_trade', quote);
  },

});


export default QuoteView;
