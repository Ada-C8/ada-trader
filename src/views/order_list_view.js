import Backbone from 'backbone';
import _ from 'underscore';
import OrderView from '../views/order_view';
import Order from '../models/order';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.orderTemplate = params.orderTemplate;
    this.quotes = params.quotes;
    this.bus = params.bus;
    this.listenTo(this.model, 'update', this.render);
  },
  render() {
    this.$('#orders').empty();
    this.model.each((order) => {
      const orderView = new OrderView({
        model: order,
        orderTemplate: this.orderTemplate,
        tagName: 'li',
        className: 'order',
        bus: this.bus,
      });
      this.$('#orders').append(orderView.render().$el);
    });
    return this;
  },
  events: {
    'click button.btn-buy': 'addOrder',
    'click button.btn-sell': 'addOrder',
  },
  addOrder: function(event) {
    event.preventDefault();
    let symbol = this.$('.order-entry-form [name=symbol]').val();
    const newOrder = new Order({
      symbol: symbol,
      targetPrice: Number(this.$('.order-entry-form [name=price-target]').val()),
      quote: this.quotes.findWhere({symbol: symbol}),
    });

    if (event.target.innerHTML === 'Buy') {
      newOrder.set('buy', true);
    } else {
      newOrder.set('buy', false)
    }
    newOrder.set('currentPrice', this.quotes.findWhere({symbol: symbol}).attributes['price']);

    if (newOrder.isValid()) {
      this.model.add(newOrder);
      this.updateStatusMessageWith(`New order for ${newOrder.get('symbol')} has been saved.`)
      this.clearForm();
    } else {
      this.updateStatusMessageFrom(newOrder.validationError);
    }
  },
  updateStatusMessageFrom: function(messageHash) {
    const statusMessagesEl = this.$('.form-errors');
    statusMessagesEl.empty();
    _.each(messageHash, (messageType) => {
      messageType.forEach((message) => {
        statusMessagesEl.append(`<p>${message}</p>`);
      });
    });
  },
  updateStatusMessageWith: function(message) {
    const statusMessagesEl = this.$('.form-errors');
    statusMessagesEl.empty();
    statusMessagesEl.append(`<p>${message}</p>`);
  },
  clearForm: function() {
    this.$('.order-entry-form input').val('')
  },
});

export default OrderListView;
