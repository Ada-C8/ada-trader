import Backbone from 'backbone';
import _ from 'underscore';

import Order from '../models/order'
import OrderView from './order_view';


const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;

    this.listenTo(this.bus, 'newOrder', this.addOrder);
    this.listenTo(this.bus, 'newOrder', this.render);
  },
  render(orderObject) {
    this.$('#orders').empty();
    console.log('render order_list_view');
    console.log(this.model);
    this.model.each((order) => {
      console.log(order);
      const orderView = new OrderView({
        model: order,
        template: this.template,
        tagName:'li',
        className: 'order',
        bus: this.bus,
      });
      console.log(orderView);
      this.$('#orders').append(orderView.render().$el);
    });
    return this;
  },
  addOrder(orderObject) {
    console.log(orderObject);
    // this.quoteList.each((quote) => {
    //   if (orderObject['symbol'] == quote.get('symbol'))
    //   orderObject['quote'] = quote
    // })
    const newOrder = new Order(orderObject);
    if (newOrder.isValid()) {
      console.log('I am a valid order')
      this.model.add(newOrder);
      // this.clearFormData();
    }
    // else {
    //   this.updateStatusMessageFrom(newOpenOrder.validationError);
    //   newOpenOrder.destroy();
    // }
  },
  renderORDER(orderObject) {
    console.log('renderORDER connection');
    console.log(orderObject);
  }
})

export default OrderListView;
