import Backbone from 'backbone';
// import _ from 'underscore';

import OrderView from '../views/order_view';
import Order from '../models/order';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'update', this.render);
    this.quotes = params.quotes;
    this.bus = params.bus;
    this.listenTo(this.bus, 'removeOrder', this.removeOrder);
    this.listenTo(this.bus, 'removeOrder', this.removeOrder);
  },
  render() {
    this.$('#orders').empty();
    this.model.each((order) =>  {
      const orderView = new OrderView({
        model: order,
        template: this.template,
        bus: this.bus,
        tagname: 'li',
        className: 'order',
      })
      this.$('#orders').append(orderView.render().$el);
    })
    return this;
  },
  events: {
    'click .btn-buy': 'addBuyOrder',
    'click .btn-sell': 'addSellOrder'
  },
  addBuyOrder: function(event) {
    event.preventDefault();

    const orderData = {
      buy: true,
      symbol: this.$('select[name=symbol]').val(),
      targetPrice: parseFloat(this.$('input[name=price-target]').val()),
    };

    orderData['quote'] =  this.quotes.where({symbol: orderData['symbol']});

    const newOrder = new Order(orderData);
    console.log ('attempting to create a new order!')

    if (newOrder.isValid()) {
      console.log('successs!')
      this.model.add(newOrder);
      this.$('.form-errors').empty();
    } else {
      console.log(newOrder.validationError);
      this.$('.form-errors').html(`<h3>${newOrder.validationError}</h3>`)
    }
  },
  addSellOrder: function(event) {
    event.preventDefault();

    const orderData = {
      buy: false,
      symbol: this.$('select[name=symbol]').val(),
      targetPrice: parseFloat(this.$('input[name=price-target]').val()),
    };

    orderData['quote'] =  this.quotes.where({symbol: orderData['symbol']});

    const newOrder = new Order(orderData);
    if (newOrder.isValid()) {
      console.log('successs!')
      this.model.add(newOrder);
      this.$('.form-errors').empty();
    } else {
      console.log(newOrder.validationError);
      this.$('.form-errors').html(`<h3>${newOrder.validationError}</h3>`)
    }
  },
  removeOrder(orderView) {
    orderView.remove();
    orderView.model.destroy();
  },
})

export default OrderListView;
