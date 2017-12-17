import Backbone from 'backbone';

import OrderView from './order_view';
import Order from '../models/order';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.quotes = params.quotes;
    this.listenTo(this.model, 'update', this.render);
  },

  render() {
    const list = this.$('#orders');
    list.empty();
    this.model.each((order) => {
      const orderView = new OrderView({
        model: order,
        template: this.template,
        tagName: 'li',
        className: 'order',
        quotes: this.quotes,
      });
      list.prepend(orderView.render().$el);
    });
    return this;
  },

  events: {
    'click .btn-buy': 'buyOrder',
    'click .btn-sell': 'sellOrder',
  },

  newOrder(buy) {
    event.preventDefault();
    const symbol = this.$(`[name=symbol]`).val();
    const targetPrice = parseFloat(this.$(`[name=target-price]`).val());
    const orderData = {
      buy,
      targetPrice,
      symbol,
    };
    console.log(orderData);
    const newOrder = new Order(orderData);
    this.model.add(newOrder);
    return newOrder;
  },

  buyOrder: function(event) {
    event.preventDefault();
    const order = this.newOrder(true);
  },

  sellOrder: function(event) {
    event.preventDefault();
    const order = this.newOrder(false);
  },
});

export default OrderListView;
