import Backbone from 'backbone';
import _ from 'underscore';
import Order from '../models/order';
import OrderView from '../views/order_view';

const OrderFormView = Backbone.View.extend({
  initialize(params){
    this.template = params.template
  },
});
export default OrderFormView;
