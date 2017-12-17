import Backbone from 'backbone';

import OrderView from './order_view';
import Order from '../models/order';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = this.bus;
    this.listenTo(this.model, 'update', this.render);

  },

  render() {
    const list = this.$('#orders');
    list.empty();
    console.log('render');
    this.model.each((order) => {
      console.log('html');
      console.log(order);
      const orderView = new OrderView({
        model: order,
        template: this.template,
        tagName: 'li',
        className: 'order',
      });
      list.append(orderView.render().$el);
    });
    return this;
  },


  events: {
    'click .btn-buy': 'buyOrder',
    'click .btn-sell': 'sellOrder',
  },

  newOrder(buy) {
    event.preventDefault();
    const orderData = {buy};
  ///// REFACTOR THIS - PRICE NEEDS TO BE IN /////
    ['symbol', 'targetPrice'].forEach((field) => {
      const val = this.$(`#order-entry-form  [name=${field}]`).val();
      console.log(val);
      orderData[field] = val;
    });
    return new Order(orderData);
  },

  buyOrder: function(event) {
    event.preventDefault();
    const order = this.newOrder(true);
    console.log('buy click');
    console.log(order);

  },

  sellOrder: function(event) {
    event.preventDefault();
    const order = this.newOrder(false);
    console.log('sell click');
    console.log(order);
  },
});

export default OrderListView;
