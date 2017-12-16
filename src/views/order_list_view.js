import Backbone from 'backbone';
import _ from 'underscore';
import OrderList from '../collections/order_list';
import OrderView from './order_view';
import Order from '../models/order';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.quotes = params.quotes;
    this.listenTo(this.model, 'update', this.render);
  },
  render() {
    this.$('#orders').empty();

    this.model.each((order) => {
      const orderView = new OrderView({
        model: order,
        bus: this.bus,
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
  createOrder(buy) {
    const orderData = {
      quotes: this.quotes,
      bus: this.bus,
      symbol: this.$('#symbol').val(),
      targetPrice: parseFloat(this.$('#target-price').val()),
      buy: buy.buy,
    };
    return new Order(orderData);
  },
  buyOrder: function(e) {
    e.preventDefault();
    this.validate(this.createOrder({buy: true}));
  },
  sellOrder: function(e) {
    e.preventDefault();
    this.validate(this.createOrder({buy: false}));
  },
  validate(order) {
    this.model.add(order);
    this.$el.find('form').trigger('reset');
  },
  addOrder(order) {
    this.model.add(order);
  },
});

export default OrderListView;
