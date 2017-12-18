import Backbone from 'backbone';
import Quote from 'models/quote';
import QuoteList from 'collections/quote_list';
import Trade from '../models/trade';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this, 'deleteOrder', this.deleteOrder);
    this.listenTo(params.quotes, 'change', this.placeOrder);
    this.quotes = params.quotes;
  },

  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  events: {
    'click button.btn-cancel': 'deleteOrder',
  },
  deleteOrder() {
    this.model.destroy();
    this.remove();
  },

  placeOrder() {

    const trade = new Trade({
      buy: this.model.buy,
      price: this.model.targetPrice,
      symbol: this.model.symbol,
    });
    // console.log(trade);

    const matchingQuote = this.quotes.bySymbol(this.model.symbol);

    if (this.model.buy && this.model.targetPrice >= matchingQuote.attributes.price) {
      matchingQuote.buy();
      // console.log(this.bus);
      this.bus.trigger('addTrade', trade);
      this.trigger('deleteOrder');
    } //else if ((this.model.buy === false) && (this.targetPrice <= Quote.model.get('price'))) {
    //   this.trigger('deleteOrder');
    //   Quote.sell();
    // }
  },
});

export default OrderView;
