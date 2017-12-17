import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'change', this.render);
  },

  events: {
    'click .btn-buy': 'buyQuote',
    'click .btn-sell': 'sellQuote',
  },

  buyQuote(event) {
    const currentTrade = {
      symbol: this.model.get('symbol'),
      price: this.model.get('price'),
      buy: true,
    };

    // SEE TRADE VIEW FOR THE LISTENER
    this.bus.trigger('add_quote', currentTrade);

    // Increases stock price by one
    this.model.buy();
  },

  sellQuote(event) {
    const currentTrade = {
      symbol: this.model.get('symbol'),
      price: this.model.get('price'),
      buy: false,
    };

    // SEE TRADE VIEW FOR LISTENER
    this.bus.trigger('add_quote', currentTrade);
    this.model.sell();
  },

  render() {
    // FIRE EACH TIME THE PRICE CHANGES
    this.bus.trigger('checkQuotePrice', this.model);

    // JSON to make the view into the proper object format
    const compiledTemplate = this.template(this.model.toJSON());

    this.$el.html(compiledTemplate);
    return this;
  },
});

export default QuoteView;
