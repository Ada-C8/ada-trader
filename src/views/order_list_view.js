import Backbone from 'backbone';
import _ from 'underscore';
import OrderView from 'views/order_view';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model,'update', this.render);
  },
  events: {
    'click button.btn-buy': 'buyOrder',
    'click button.btn-sell': 'sellOrder',
  },
  render() {
    const currentOpenOrders = this.$('#orders-list-container');
    currentOpenOrders.empty();
    this.model.each((order) => {
      const orderView = new OrderView({
        model: order,
        template: this.template,
        bus: this.bus,
        tagName: 'li',
        className: `order ${order.get('classStatus')}`,
      });
      this.$('#orders-list-container').prepend(orderView.render().$el);
    });
    return this;
  },
  buyOrder(event) {
    // this.model.add(order);
    event.preventDefault();
    console.log('buying this order');
    console.log(event);
  },
  sellOrder(event) {
    event.preventDefault();
    console.log('selling this order');
    console.log(event);
  },
});

export default OrderListView;
