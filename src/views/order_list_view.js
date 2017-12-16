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
  getFormData: function() {
    const formData = {
      symbol: this.$('select option:selected').text(),
      price: this.$('input').val(),
    };
    return formData;
  },
  createOrder: function(e) {
    e.preventDefault();
  console.log('in createOrder sucka!');
  this.getFormData();
  }

});

export default OrderListView;
