import Backbone from 'backbone';
// import Quote from '../models/quote';

const TradeHistoryView = Backbone.View.extend({
  initialize(params) {
    this.bus = params.bus;
    this.template = params.template,
    this.listenTo(this.bus, 'bought', this.newBuy);
    this.listenTo(this.bus, 'sold', this.newSell);
  },
  newBuy(quote){
    const generatedHTML = this.template({
      buy: true,
      price: quote.get('price'),
      symbol: quote.get('symbol'),
    });

    this.$('#trades').prepend(generatedHTML);
  },
  newSell(quote){
    const generatedHTML = this.template({
      buy: false,
      price: quote.get('price'),
      symbol: quote.get('symbol'),
    });

    this.$('#trades').prepend(generatedHTML);
  },
});

export default TradeHistoryView;
