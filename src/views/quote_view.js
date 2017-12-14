import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;

    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.bus, 'order_sale', this.buySellQuote);
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    this.bus.trigger('quote_price_change', this.model)
    return this;
  },
  events: {
    'click button.btn-buy': 'buy',
    'click button.btn-sell': 'sell',
  },
  buy(event) {
    console.log('buying');
    // this.model.buy();

    // console.log(this.model.price)
    // let tradeData = {
    // };
    this.buySellQuote({ buy: true, symbol: this.model.get('symbol') });
    // this.bus.trigger('selected_trade', this.model);
  },
  sell(event) {
    console.log('selling');
    this.buySellQuote({ buy: false, symbol: this.model.get('symbol') });

    // this.model.sell();
    // this.bus.trigger('selected_trade', this.model);
  },
  buySellQuote(data) {
    if (data.symbol !== this.model.get('symbol')) {
      return
    }
    let salePrice = data.buy ? this.model.buy() : this.model.sell();
    const details = {
      price: salePrice,
      symbol: this.model.get('symbol'),
      buy: data.buy,
    }
    this.bus.trigger('selected_trade', details)
  },
});

export default QuoteView;
