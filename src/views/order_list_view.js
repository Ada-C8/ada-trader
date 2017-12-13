import Backbone from 'backbone';
import OrderView from './order_view';
import Order from '../models/order';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'update', this.render);
    this.listenTo(this.bus, 'createOrder', this.addOrder);
  },
  render() {
    const list = this.$('#orders');
    list.empty();
    this.model.each((order) => {
      const quoteView = new OrderView({
        model: order,
        template: this.template,
        tagName: 'li',
        className: 'order',
        bus: this.bus,
      });
      list.append(quoteView.render().$el);
    });
    return this;
  },
  addOrder(params) {
    const orderData = params;
    ['symbol', 'targetPrice'].forEach( (field) => {
      const val = this.$(`.order-entry-form [name=${field}]`).val();
      if (val != '' && val != undefined) {
        orderData[field] = val;
      }
    });
    console.log(orderData);
    const newOrder = new Order(orderData);
    if (newOrder.isValid()) {
      console.log('VALID');
    //   this.model.add(newTask);
    //   this.$('#add-task-form')[0].reset();
    // this.updateStatusMessages(`New task added: ${newTask.get('task_name')}`);
    } else {
      console.log('NOT VALID');
      console.log(newOrder);
    //   this.updateStatusMessages(newTask.validationError);
    }
  }
});

export default OrderListView;
