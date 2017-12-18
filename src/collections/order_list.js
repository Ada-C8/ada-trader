import Backbone from 'backbone';
import Order from '../models/order';
import _ from 'underscore';

const OrderList = Backbone.Collection.extend({
  model: Order,
});

export default OrderList;
