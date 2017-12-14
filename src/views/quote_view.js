import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  initialize: function(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, "change", this.render);
  },

  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);

    console.log("I am rendering a new quoteView");
    // this.checkPrice(102)
    return this;
  },

  events: {
    'click button.btn-buy': 'buyQuote',
    'click button.btn-sell': 'sellQuote'
  },

  sellQuote(event){
    console.log('the sell button has been clicked');
    this.makeTradeObject(false);
    this.model.sell();
  },

  buyQuote(event){
    console.log('the buy button has been clicked');
    this.makeTradeObject(true);
    this.model.buy();
  },

  makeTradeObject(buy) {
    const trade_data = {
      symbol: this.model.get('symbol'),
      price: this.model.get('price'),
      buy: buy,
    };
    this.bus.trigger('addTrade', trade_data);
  },

  checkPrice(setPrice) {
    if (this.model.get('price') > setPrice) {
     console.log('price is over')
   };
  },


});

export default QuoteView;
