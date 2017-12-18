import Backbone from 'backbone';
import $ from 'jquery';
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
    const list = this.$('#orders');
    list.empty();
    this.model.each((order) => {
      const orderView = new OrderView({
        model: order,
        template: this.template,
        tagName: 'li',
        className: 'order',
        quotes: this.quotes,
        bus: this.bus,
      });
      list.prepend(orderView.render().$el);
    });
    return this;
  },

  events: {
    'click .btn-buy': 'buyOrder',
    'click .btn-sell': 'sellOrder',
  },

  createOrder(buy) {
    event.preventDefault();
    $('.form-errors').empty();
    const symbol = this.$(`[name=symbol]`).val();
    const targetPrice = parseFloat(this.$(`[name=target-price]`).val());
    const orderData = {
      buy,
      targetPrice,
      symbol,
    };
    const newOrder = new Order(orderData);
    this.model.add(newOrder);

    if (newOrder.isValid()) {
      return newOrder;
    } else {
      newOrder.destroy();
      this.errorMessage(newOrder.validationError);
    }
  },
  errorMessage(errors) {
    Object.entries(errors).forEach((error)=> {
      $('.form-errors').prepend(`<h3>${error[1]}</h3>`);
    })
  },

  buyOrder: function(event) {
    event.preventDefault();
    const order = this.createOrder(true);
  },

  sellOrder: function(event) {
    event.preventDefault();
    const order = this.createOrder(false);
  },
});

export default OrderListView;
