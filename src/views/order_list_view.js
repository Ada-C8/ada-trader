import Backbone from 'backbone';
import _ from 'underscore';
import OrderView from '../views/order_view';
import Order from '../models/order';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'update', this.render);
  },
  render() {
    this.$('#orders').empty();
    this.model.each((order) => {
      const orderView = new OrderView({
        model: order,
        template: this.template,
        tagName: 'li',
        className: 'order'
      });

      this.$('#orders').append(orderView.render().$el);
    });
    return this;
  }, // end of render
  listOrders(orderView){
    const compiledOrdersTemplate = orderView.template(orderView.model.toJSON());
    this.$('#orders').prepend(compiledOrdersTemplate);
  }
});

export default OrderListView;
