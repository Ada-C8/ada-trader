import Backbone from 'backbone';
import Order from '../models/order';
import OrderView from '../views/order_view';
import OrderList from '../collections/order_list';
import _ from 'underscore';

const OrderListView = Backbone.View.extend({
  initialize(params){
    this.template = params.template;
    this.listenTo(this.model, 'update', this.renderOrders)
  },
  events: {
    'click .btn-buy, .btn-sell': 'addOrder',
  },
  renderOrders(){

    this.model.each((order) => {

      const orderView = new OrderView({
        model: order,
        template: this.template,
        tagName: 'li',
        className: 'order',
        // bus: this.bus,
      });
      this.$('#orders').append(orderView.renderOrder().$el);
    });
    return this;

  },

  addOrder(event) {
    event.preventDefault();
    const formData = this.getFormData();
    formData['buy'] = event.target.classList[0] === ('btn-buy')  ? true : false;
    const newOrder = new Order(formData);
    // const viewOrder =  new OrderView({
    //   model: newOrder,
    //   template: this.$('#order-template'),
    //   el: 'li'
    //   //  _.template(this.$('#order-template')),
    // });

    this.model.add(newOrder)
    // console.log(viewOrder);
  },

  getFormData() {
    const orderData = {};
    // ['symbol', 'price-target'].forEach((field) => {
      const val = Number(this.$('#order-form input[name="targetPrice"]').val());

      // this.$(`#add-task-form input[name=${field}]`).val();
      // if (val !== '') {
      orderData['targetPrice'] = val;
      // }
    // });
    orderData['symbol'] = this.$('select[name=symbol]').val();
    return orderData;
  },

});

export default OrderListView;
