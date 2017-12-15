import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
// import QuoteView from '../views/quote_view';
// import Quote from '../models/quote';
import OrderView from '../views/order_view';
import Order from '../models/order';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.ordersTemplate;
    this.listenTo(this.model, 'update', this.render);
  },
  render() {
    this.model.forEach((order) => {
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
    'click .btn-buy': 'buyOrder',
  },
  buyOrder: function(event) {

    console.log('You pressed the Buy Order button.');
    event.preventDefault();
    this.addToOrders(event, true);
  },
  addToOrders: function(event, buyIsTrue) {
    const orderData ={};
    orderData['symbol'] = this.$(`input[name=symbol]`);
    orderData['targetPrice']= this.$('input[name=price-target]');
    orderData['buy'] = buyIsTrue;
    //TODO - need to add a validation
    const newOrder = new Order(orderData)
    if (newOrder.isValid()) {
      this.model.add(newOrder);
    } else {
      newOrder.destroy();
    };
  },
  updateStatusMessageFrom: function(messageHash) {
  const statusMessagesEl = this.$('.form-errors');
  statusMessagesEl.empty();
  _.each(messageHash, (messageType) => {
    messageType.forEach((message) => {
      statusMessagesEl.append(`<li>${message}</li>`);
    })
  });
  statusMessagesEl.show();
},
updateStatusMessageWith: function(message) {
  const statusMessagesEl = this.$('.form-errors');
  statusMessagesEl.empty();
  statusMessagesEl.append(`<li>${message}</li>`);
  statusMessagesEl.show();
}
});

export default OrderListView;

//select the current element from the dropdown:
//this.$('select[name=symbol] option:selected')
