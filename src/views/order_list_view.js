import Backbone from 'backbone';
import Order from '../models/order';
import OrderView from './order_view';
import $ from 'jquery';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.bus = params.bus;
    this.template = params.template;
    this.quotes = params.quotes;
    this.listenTo(this.model, 'update', this.render);
  },
  render() {
   this.$('#orders').empty();

   this.model.each((order) => {
     const orderView = new OrderView({
       model: order,
       template: this.template,
       bus: this.bus,
       tagName: 'li',
       quotes: 'this.quotes',
       className: 'order',
     });
     this.$('#orders').append(orderView.render().$el);
   });
   return this;
  },
});


export default OrderListView;
