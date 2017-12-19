// list of all open orders
// Orders are listed with the oldest at the top.
// Each open order entry in the list includes the symbol being ordered, whether it is a buy or sell order, the target price, and a cancel button.

import Backbone from 'backbone';
import Order from 'models/order';

const OrderList = Backbone.Collection.extend({
  model: Order,
});

export default OrderList;
