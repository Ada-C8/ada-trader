import Backbone from 'backbone';
import Order from 'models/order';

const OpenOrders = Backbone.Collection.extend({
  model: Order,
});

export default OpenOrders;
