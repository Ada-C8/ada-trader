import Backbone from 'backbone';
import Order from '../models/order';

const OrderList = Backbone.collection.extend({
  model: Order,
});

export default OrderList;
