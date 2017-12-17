import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({

  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'change', this.render);
  },
  events: {
    'click button.btn-buy': 'buyQuote',
    'click button.btn-sell': 'sellQuote',
  },
  buyQuote() {

    let tradeObject = {
      price: this.model.get('price'),
      symbol: this.model.get('symbol'),
      buy: true,
    }

    this.bus.trigger('add_trade', tradeObject)
    this.model.buy();
  },
  sellQuote() {
    let tradeObject = {
      price: this.model.get('price'),
      symbol: this.model.get('symbol'),
      buy: false,
    }
    this.bus.trigger('add_trade', tradeObject)
    this.model.sell();
  },
  render() {
    let quote = this.model;
    // trigger quote_change event which quotelist view will listen for
    this.bus.trigger('quote_change', quote);
    console.log(this.model);
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },

});

export default QuoteView;
