import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({

  initialize(params) {
    // use #quote-template
    this.template = params.template;
    this.bus = params.bus;
    // any time the stock "changes" change event on model
    this.listenTo(this.model, 'change', this.render);
  },
  events: {
    'click button.btn-buy': 'buyQuote',
    'click button.btn-sell': 'sellQuote',
  },
  buyQuote() {
    // this.bus.trigger('selected_task', this.model);

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
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },

});

export default QuoteView;
