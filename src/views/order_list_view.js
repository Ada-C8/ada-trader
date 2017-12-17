import Backbone from 'backbone';
import _ from 'underscore';

import Order from '../models/order'
import OrderView from './order_view';


const OrderListView = Backbone.View.extend({
  initialize(params) {
    console.log(params);
    this.template = params.template;
    // this.template = "orderTemplate";
    this.bus = params.bus;

    this.listenTo(this.bus, 'newOrder', this.render);
  },
  render(orderObject) {
    this.$('#orders').empty();
    // console.log('render order_list_view');
    // console.log(orderObject);
    // this.model.each((order) => {
    //   console.log(order);
      const orderView = new OrderView({
        model: new Order(orderObject),
        template: this.template,
        tagName:'li',
        className: 'order',
        bus: this.bus,
      });
      // console.log(orderView);
      this.$('#orders').append(orderView.render().$el);
    // });
    return this;
  },
  renderORDER(orderObject) {
    console.log('renderORDER connection');
    console.log(orderObject);
  }
})

export default OrderListView;
