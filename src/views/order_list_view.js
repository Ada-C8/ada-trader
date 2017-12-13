import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import Order from 'models/order';
import OrderView from './order_view';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'update', this.render);

    this.orderEntryForm(params.symbols.models);
  },
  render() {
    this.$('#orders').empty();
    this.model.each((order) => {
      const orderView = new OrderView({
        model: order,
        template: this.template,
        tagName: 'li',
        className: 'order',
      });
      this.$('#orders').append(orderView.render().$el);
    });
    return this;
  },
  orderEntryForm(quotes) {
    quotes.forEach((symbol) => {
      const value = symbol.get('symbol');
      $('select').append(`<option value="${value}">${value}</option>`);
    });
  },
  events: {
    'click button.btn-buy': 'buyOrder',
    'click button.btn-sell': 'sellOrder',
  },
  buyOrder: function(event) {
    event.preventDefault();
    const symbol = this.$(`[name=symbol]`).val();
    const price = parseInt(this.$(`[name=price-target]`).val());
    const orderData = {buy: true, targetPrice: price, symbol: symbol};
    const newOrder = new Order(orderData);
    if (newOrder.isValid()) {
      this.model.add(newOrder);
    } else {
      this.errorMessage(newOrder.errors);
    }
  },
  sellOrder(event) {
    event.preventDefault();
    const symbol = this.$(`[name=symbol]`).val();
    const price = parseInt(this.$(`[name=price-target]`).val());
    const orderData = {buy: false, targetPrice: price, symbol: symbol};
    const newOrder = new Order(orderData);
    if (newOrder.isValid()) {
      this.model.add(newOrder);
    } else {
      this.errorMessage(newOrder.errors);
    }
  },
  errorMessage(errors) {

  },
});

export default OrderListView;
