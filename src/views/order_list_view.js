import Backbone from 'backbone';
import _ from 'underscore';
import OrderView from '../views/order_view';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.orderTemplate = params.orderTemplate;
    this.listenTo(this.model, 'update', this.render);
  },
  render() {
    console.log('in order_list_view render');
    this.$('#orders').empty();
    this.model.each((order) => {
      const orderView = new OrderView({
        model: order,
        orderTemplate: this.orderTemplate,
        tagName: 'li',
        className: 'order',
      });
      this.$('#orders').append(orderView.render().$el);
    });
    return this;
  },
  events: {
    'click .order-entry-form .btn-buy': 'buyOrder',
    'click .order-entry-form .btn-sell': 'sellOrder',
  },
  buyOrder: function(event) {
    console.log('in buyOrder');
  },
  sellOrder: function(event) {
    console.log('in sellOrder');
  },
});

export default OrderListView;
