import Backbone from 'backbone';
import  Order from 'models/order';
import _ from 'underscore';
import OrderList from 'collections/order_list';
import OrderView from 'views/order_view';


const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'update', this.render);
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
    'click button.btn-buy': 'newBuy',
    'click button.btn-sell': 'newSell'
  },
  getFormData: function() {
    const formData = {
      // buy: false,
      symbol: this.$('select option:selected').text(),
      targetPrice: parseFloat(this.$('input').val()),
    };
    console.log(formData);
    return formData;
  },
  newBuy: function(e) {
    e.preventDefault();
    this.createOrder(true);
  },
  newSell: function(e) {
    e.preventDefault();
    this.createOrder(false);
  },
  createOrder: function(buy) {

    let formData = this.getFormData();
    formData.buy = buy;
    const newOrder = new Order(formData);
    this.model.add(newOrder);

  },

});

export default OrderListView;
