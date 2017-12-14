import QuoteList from 'collections/quote_list';
import Backbone from 'backbone';

const quoteList = QuoteList;

const OrderFormView = Backbone.View.extend({
  initialize(params) {
    // this.listenTo(this.model, 'change', this.render);
    this.bus = params.bus;
  },
  render(quotes) {
    quotes.models.forEach((model) => {
      const symbol = model.attributes.symbol;
      this.$('select').append(`<option value=${symbol}>${symbol}</option>`);
    });
    return this;
  },
  events: {
    'click button.btn-buy': 'buyOrder',
    'click button.btn-sell': 'sellOrder',
  }
});

export default OrderFormView;
