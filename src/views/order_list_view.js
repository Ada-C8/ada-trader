import Backbone from 'backbone';

import Order from '../models/order';
import OrderView from './order_view';

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

  createOrder(buyOption) {
    const orderData = {
      quotes: this.quotes,
      bus: this.bus,
      symbol: this.$('#symbol').val(),
      targetPrice: parseFloat(this.$('#target-price').val()),
      buy: buyOption.buy,
    };

    return new Order(orderData);
  },

  buyOrder: function(event) {
    event.preventDefault();
    this.clearErrors();
    const order = this.createOrder({buy: true});

    this.validate(order);
  },

  sellOrder: function(event) {
    event.preventDefault();
    this.clearErrors();

    const order = this.createOrder({buy: false});

    this.validate(order);
  },

  validate(order) {
    if (order.isValid()) {
      this.model.add(order);
      this.$el.find('form').trigger('reset');
    } else {
      this.renderError(order.validationError);
    }
  },

  clearErrors() {
    this.$('.form-errors').empty();
  },

  renderError(errors) {
    const errorSection = this.$('.form-errors');
    Object.keys(errors).forEach((field) => {
      errors[field].forEach((error) => {
        const html = `<p class="error-message small-6 cell">${field}: ${error}</p>`;
        errorSection.append(html);
      });
    });
  },

  addOrder(order) {
    this.model.add(order);
  },
});

export default OrderListView;
