import Backbone from 'backbone';
import Order from 'models/order';

const OrderList = Backbone.Model.extend({
  model: Order;
});

export default OrderList;
