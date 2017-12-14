import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.bus, 'order_sale', this.buySellQuote)
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());

    this.$el.html(compiledTemplate);

    this.bus.trigger('quote_change_price', this.model)

    return this
  },

  events: {
    'click button.btn-buy': 'buyQuote',
    'click button.btn-sell': 'sellQuote',
  },

  buyQuote(event) {
    this.buySellQuote({ buy: true, symbol: this.model.get('symbol') });
  },

  sellQuote(event) {
    this.buySellQuote({ buy: false, symbol: this.model.get('symbol') });
  },

  buySellQuote(info) {
    if (info.symbol !== this.model.get('symbol')) {
      return
    }
    let salePrice = info.buy ? this.model.buy() : this.model.sell();

    const attributes = {
      buy: info.buy,
      symbol: this.model.get('symbol'),
      price: salePrice
    }
    this.bus.trigger('buy_sell_quote', attributes)
  },

});


export default QuoteView;
