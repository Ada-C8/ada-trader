import Backbone from 'backbone';
import Order from '../models/order';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.bus;
    this.bus = params.bus;
  }
});

export default OrderView;
