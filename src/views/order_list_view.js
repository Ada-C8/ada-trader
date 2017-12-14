import Backbone from 'backbone';

import OrderView from './order_view';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.orderViews = [];

    this.listenTo(this.model, 'update', this.render);
    this.listenTo(this.bus, 'addOrder', this.addOrder);
  },
  render() {
    this.$('#orders').empty();
    this.orderViews.forEach((view) => {
      view.remove();
    });

    this.model.each((order) => {
      const orderView = new OrderView({
        model: order,
        bus: this.bus,
        template: this.template,
        tagName: 'li',
        className: 'order',
      });
      this.orderViews.push(orderView);
      this.$('#orders').append(orderView.render().$el);
    });
    return this;
  },
  addOrder(order) {
    this.model.add(order);
  },
});

export default OrderListView;
