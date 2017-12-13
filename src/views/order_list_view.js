// import _ from 'underscore';
import Backbone from 'backbone';
import Order from '../models/order';
import OrderList from '../collections/order_list';
import OrderView from './order_view';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.bus = params.bus;
    this.template = params.template;

    this.listenTo(this.model, 'update', this.render);
  },
  render() {
    const $orderList = this.$('#orders');
    $orderList.empty();

    this.model.each((order) => {
      const orderView = new OrderView({
        model: order,
        tagName: 'li',
        className: 'order',
        template: this.template,
        bus: this.bus,
      });
      $orderList.prepend(orderView.render().$el);
    });

    return this;
  },
});

export default OrderListView;
