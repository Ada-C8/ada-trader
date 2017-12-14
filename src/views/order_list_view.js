import Backbone from 'backbone';
import _ from 'underscore';
import OrderView from '../views/order_view';
import Order from '../models/order';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'update', this.render);
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
  events: {
    'click button.btn-buy': 'openBuyOrder',
  },
  openBuyOrder(event) {
  event.preventDefault();
  const orderData = {};
  ['symbol', 'price'].forEach((field) => {
    const val = this.$(`select[name=${field}]`).val();
      orderData[field] = val;
  });
  const newOrder = new Order(orderData);
  if (newOrder.isValid()) {
    this.model.add(newOrder);
    }
  }
});

export default OrderListView;
