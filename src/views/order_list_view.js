import Backbone from 'backbone';
import _ from 'underscore';

import OrderView from '../views/order_view';
import Order from '../models/order';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'update', this.render);
  },
  render() {
    this.$('#orders').empty();
    this.model.each((order) =>  {
      const orderView = new OrderView({
        model: order,
        template: this.template,
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

    const newOrder = new Order(orderData);

    if (newOrder.isValid()) {
      this.model.add(newOrder);
    } else {
      console.log( 'order is not valid' );
    }
  }
})

export default OrderListView;
