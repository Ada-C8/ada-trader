import Backbone from 'backbone';
import Order from 'models/order';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
  },
});

export default OrderView;
