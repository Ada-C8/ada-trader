import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import Order from 'models/order';
import OrderView from './order_view';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'update', this.render);

    this.orderEntryForm(params.symbols.models);
  },
  render() {
    this.$('#orders').empty();
    this.model.each((order) => {
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
  orderEntryForm(quotes) {
    quotes.forEach((symbol) => {
      const value = symbol.get('symbol');
      $('select').append(`<option value="${value}">${value}</option>`);
    });
  },
  events: {
    'click button.btn-buy': 'buyOrder'
  },
  buyOrder: function(event) {
    event.preventDefault();
    const orderData = {};
    ['price-target','name'].forEach((field) => {
      const val = this.$(`[name=${field}]`).val();
      console.log(val);
      if (val != '') {
        taskData[field] = val;
      }
    });
    const newOrder = new Order(orderData);
    $('#orders').prepend(this.orderTemplate(newOrder));
  },
  sellOrder(e) {
    e.preventDefault();
    const addSell = {};
    $('#orders').prepend(this.orderTemplate(addSell));
  },
});

export default OrderListView;
