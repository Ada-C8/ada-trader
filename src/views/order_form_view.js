// import QuoteList from 'collections/quote_list';
import Backbone from 'backbone';
import Order from '../models/order';
import OpenOrders from 'collections/open_orders';


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
    const order = new Order();
    order.attributes.symbol = event.target.form[0].value;
    order.attributes.targetPrice = parseFloat(event.target.form[1].value);
    this.model.add(order);
  },
  sellOrder: function(event) {
    event.preventDefault();
    const order = new Order();
    order.attributes.symbol = event.target.form[0].value;
    order.attributes.targetPrice = parseFloat(event.target.form[1].value);
    order.attributes.buy = false;
    this.model.add(order);
  }
});

export default OrderFormView;
