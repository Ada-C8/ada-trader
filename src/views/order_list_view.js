import Backbone from 'backbone';
import _ from 'underscore';

import QuoteView from '../views/quote_view';
import OrderView from '../views/order_view';
import Quote from '../models/quote';
import Order from '../models/order';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.bus = params.bus;
    this.template = params.template;
    this.listenTo(this.bus, 'newOrder', this.addOrder);
    this.listenTo(this.model, 'update', this.render);
  },
  render() {
    this.$('#orders').empty();
    this.model.each((order) => {
      const orderView = new OrderView({
        model: order,
        template: this.template,
        bus: this.bus,
        tagName: 'li',
        className: 'quote',
      });
      this.$('#orders').append(orderView.render().$el);
    });
  },
  addOrder(order) {
    this.model.add(order)
  },
});

export default OrderListView;
