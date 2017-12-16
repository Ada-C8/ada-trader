import Backbone from 'backbone';
// import _ from 'underscore';

import OrderView from '../views/order_view';
import Order from '../models/order';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.quotes = params.quotes;
    this.bus = params.bus;
    this.listenTo(this.model, 'update', this.render);
    this.listenTo(this.bus, 'removeOrder', this.removeOrder);
  },
  render() {
    this.$('#orders').empty();
    this.model.each((order) =>  {
      const orderView = new OrderView({
        model: order,
        template: this.template,
        bus: this.bus,
        tagname: 'li',
        className: 'order',
      })
      this.$('#orders').append(orderView.render().$el);
    });
    this.quotes.each((quote) => {
      this.$('select[name=symbol]').append(`<option value="${quote.get('symbol')}">${quote.get('symbol')}</option>`);
    });
    return this;
  },
  events: {
    'click .button': 'addOrder',
  },
  addOrder: function(event) {
    event.preventDefault();

    const orderData = {
      buy: this.$(event.currentTarget).data('buy'),
      symbol: this.$('select[name=symbol]').val(),
      quote: this.quotes.find({symbol: this.$('select[name=symbol]').val()}),
      targetPrice: parseFloat(this.$('input[name=price-target]').val()),
    };

    const newOrder = new Order(orderData);

    if (newOrder.isValid()) {
      this.model.add(newOrder);
      this.$('.form-errors').empty();
    } else {
      this.$('.form-errors').html(`<h3>${newOrder.validationError}</h3>`)
    }
  },
  removeOrder(orderView) {
    orderView.remove();
    orderView.model.destroy();
  },
})

export default OrderListView;
