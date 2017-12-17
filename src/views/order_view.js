import Backbone from 'backbone';
import Quote from 'models/quote';
import QuoteList from 'collections/quote_list';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this, 'deleteOrder', this.deleteOrder);
    this.listenTo(params.quotes, 'change', this.placeOrder);
    this.quotes = params.quotes;
    console.log(params);
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
    console.log('placeOrder');
    const matchingQuote = this.quotes.bySymbol(this.model.symbol);
    if (this.model.buy && this.model.targetPrice >= matchingQuote.attributes.price) {
      matchingQuote.buy();
      this.trigger('deleteOrder');
    } //else if ((this.model.buy === false) && (this.targetPrice <= Quote.model.get('price'))) {
    //   this.trigger('deleteOrder');
    //   Quote.sell();
    // }
  },
});

export default OrderView;
