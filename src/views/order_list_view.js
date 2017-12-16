import Backbone from 'backbone';

import OrderView from './order_view';
import Order from '../models/order';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.quotes = params.quotes;
    this.bus = this.bus;
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
    'click .btn-buy': 'buyOrder',
    'click .btn-sell': 'sellOrder',
  },

  newOrder(buyOrSell) {
    event.preventDefault();
    console.log('it clicked!');
    const orderData = {buy: true};
    ['symbol', 'target-price'].forEach( (field) => {
      const val = this.$(`#order-entry-form  [name=${field}]`).val();
      console.log(val);
      orderData[field] = val;
    });
    const newOrder = new Order(orderData);
    console.log(orderData);
  },

  buyOrder: function(event) {
    event.preventDefault();
    const order = this.newOrder({buy: true});
    console.log('buy click');
    console.log(order);

  },

  sellOrder: function(event) {
    event.preventDefault();
    const order = this.newOrder({buy: false});
    console.log('sell click');
    console.log(order);
  },
});

export default OrderListView;
