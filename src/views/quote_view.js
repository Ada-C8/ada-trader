import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  initialize: function(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.bus, 'buyMe', this.buyQuotefromOrder)
  },

  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    //Every time the price changes, tell the openOrderListView to evaluate the new price
    this.bus.trigger('currentPrice',this.model)
    return this;
  },

  events: {
    'click button.btn-buy': 'buyQuoteFromButton',
    'click button.btn-sell': 'sellQuoteFromButton'
  },

  sellQuoteFromButton(){
    this.makeTradeObject(false);
    this.model.sell();
  },

  buyQuoteFromButton(){
    this.makeTradeObject(true);
    this.model.buy();
  },

  buyQuotefromOrder(openOrder){
    if (openOrder.get('symbol') == this.model.get('symbol')){
      console.log('I am buying a quote from an order')
      this.makeTradeObject(true);
      this.model.buy();
    }
  },

  sellQuotefromOrder(openOrder){
    if (openOrder.get('symbol') == this.model.get('symbol')){
      console.log('I am selling quote from an order')
      this.makeTradeObject(false);
      this.model.buy();
    }
  },

  makeTradeObject(buy) {
    const trade_data = {
      symbol: this.model.get('symbol'),
      price: this.model.get('price'),
      buy: buy,
    };
    this.bus.trigger('addTrade', trade_data);
  },
});

export default QuoteView;
