import Backbone from 'backbone';
import Trade from '../models/trade';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.quotes = params.quotes;
    this.listenTo(this, 'deleteOrder', this.deleteOrder);
    this.listenTo(params.quotes, 'change', this.placeOrder);
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

    // bySymbol is custom filter created in quote_list
    const matchingQuote = this.quotes.bySymbol(this.model.symbol);

    if (this.model.buy) {
      if (this.model.targetPrice < matchingQuote.attributes.price) {
        matchingQuote.buy();
        this.bus.trigger('addTrade', trade); // newTrade() in trade_list_view
        this.trigger('deleteOrder'); // deleteOrder() above ^^
      }
    } else if (!this.model.buy) {
      if (this.model.targetPrice > matchingQuote.attributes.price) {
        matchingQuote.sell();
        this.bus.trigger('addTrade', trade); // newTrade() in trade_list_view
        this.trigger('deleteOrder'); // deleteOrder() above ^^
      }
    }
  },
});

export default OrderView;
