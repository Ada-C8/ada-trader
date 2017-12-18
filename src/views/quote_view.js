import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
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
    'update this.model': 'makeTradeObject'
  },
  buyQuote(event) {
    console.log('clicked into buyQuote')
    console.log(this.model);
    this.makeTradeObject(true),
    this.model.buy()
  },
  sellQuote(event) {
    console.log('clicked into sellQuote');
    this.makeTradeObject(false),
    this.model.sell()
  },
  makeTradeObject(buy) {
    console.log('buy stuff');
    const trade = {
      symbol: this.model.get('symbol'),
      price: this.model.get('price'),
      buy: buy,
    };
    console.log('trade object');
    console.log(trade);
    this.bus.trigger('makeTrade', trade);
  },
  checkQuote() {
    this.bus.trigger('change', this.model)
  }
});

export default QuoteView;
