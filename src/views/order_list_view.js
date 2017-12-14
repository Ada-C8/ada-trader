import Backbone from 'backbone';
import OrderView from './order_view';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
  },

  render() {

    return this;
  },
});

export default OrderListView;
