import QuoteList from 'collections/quote_list';
import Backbone from 'backbone';
import Order from '../models/order';

// const quoteList = QuoteList;

const OrderFormView = Backbone.View.extend({
  initialize(params) {
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
  },
  buyOrder: function(event) {
    event.preventDefault();
    const order = new Order;
    order.bus = this.bus;
    order.buy(event);
  },
  sellOrder: function(event) {
    event.preventDefault();
    const order = new Order;
    order.sell(event);
  }
});

export default OrderFormView;
