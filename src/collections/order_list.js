import Backbone from 'backbone';
import Quote from 'models/quote';
import Order from 'models/order';

const OrderList = Backbone.Collection.extend({
  model: Order,
});

export default OrderList;
