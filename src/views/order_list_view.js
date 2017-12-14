import Backbone from 'backbone';
import OrderView from './order_view';
import Order from '../models/order';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'update', this.render);
    this.listenTo(this.bus, 'createOrder', this.addOrder);
  },
  render() {
    const list = this.$('#orders');
    list.empty();
    this.model.each((order) => {
      const quoteView = new OrderView({
        model: order,
        template: this.template,
        tagName: 'li',
        className: 'order',
        bus: this.bus,
      });
      list.append(quoteView.render().$el);
    });
    return this;
  },
  addOrder(orderData, quotes) {
    const newOrder = new Order(orderData);
    if (newOrder.isValid()) {
      if (orderData.buy) {
        if (orderData.targetPrice < quotes.findWhere({symbol: orderData.symbol}).get('price')) {
          this.model.add(newOrder);
          this.$('.order-entry-form form')[0].reset();
        } else {
          newOrder.destroy();
          this.bus.trigger('formErrors', '<h3>Price higher than market price!</h3>');
        }
      } else {
        if (orderData.targetPrice > quotes.findWhere({symbol: orderData.symbol}).get('price')) {
          this.model.add(newOrder);
          this.$('.order-entry-form form')[0].reset();
        } else {
          newOrder.destroy();
          this.bus.trigger('formErrors', 'Price lower than market price!');
        }
      }
    } else {
      Object.keys(newOrder.validationError).forEach((key) => {
        newOrder.validationError[key].forEach((error) => {
          this.bus.trigger('formErrors', error);
        })
      })
      newOrder.destroy();
    }
  }
});

export default OrderListView;
