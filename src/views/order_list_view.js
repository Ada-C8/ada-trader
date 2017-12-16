import Backbone from 'backbone';
import  Order from 'models/order';
import _ from 'underscore';
import OrderList from 'collections/order_list';
import OrderView from 'views/order_view';


const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
  },
  render() {
    this.$('#orders').empty();

    this.model.each((order) => {
      console.log(`rendering ${order}`);
      const orderView = new OrderView({
        model: order,
        template: this.template,
        tagName: 'li',
        className: 'order',
      });
      this.$('#orders').append(orderView.render().$el);
    });
    return this;
  },
  events: {
    'click button.btn-buy': 'createOrder',
    'click button.btn-sell': 'createOrder'
  },
  getFormData() {
    const formData = {};
    ['symbol', 'price'].forEach((field) => {
      const val = this.$(`.order-entry-form input[name=${field}]`).val();
      if (val !== '') {
        formData[field] = val;
      }
    });
    return formData;
  },
  createOrder: function(e) {
    e.preventDefault();
  console.log('in createOrder sucka!');
  }

});

export default OrderListView;
