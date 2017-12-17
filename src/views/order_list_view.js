import Backbone from 'backbone';
// import _ from 'underscore';
// import OrderList from '../collections/order_list';
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
        template: this.template,
        bus: this.bus,
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
  createOrder(value) {
    const orderData = {
      buy: value.buy,
      symbol: this.$('select[name=symbol]').val(),
      quote: this.quotes.find({symbol: this.$('select[name=symbol]').val()}),
      targetPrice: parseFloat(this.$('input[name=price-target]').val()),
      bus: this.bus,
    };
    return new Order(orderData);
  },
  buyOrder: function(event) {
    event.preventDefault();
    const order = this.createOrder({buy: true});
    this.validate(order);
  },
  sellOrder: function(event) {
    event.preventDefault();
    const order = this.createOrder({buy: false});
    this.validate(order);
  },
  validate(order) {
    this.model.add(order);
    this.$el.find('form').trigger('reset');
  },
});

export default OrderListView;
