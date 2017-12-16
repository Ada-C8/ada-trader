import Backbone from 'backbone';
import _ from 'underscore';
import Order from '../models/order';
import OrderView from '../views/order_view';

const OrderListView = Backbone.View.extend({

  initialize(params){
    this.template = params.template;
    this.quoteList = params.quoteList;
    this.listenTo(this.model, 'update', this.render);
  },

  events: {
    'click button.btn-buy': 'buyOrder',
    'click button.btn-sell': 'sellOrder',
  },

  render(){
    this.$('#orders').empty();

    this.model.forEach((order) => {
        const orderView = new OrderView({
          model: order,
          template: this.template,
          tagName: 'li',
          className: 'order'
        });

        //listen?
        this.$('#orders').append(orderView.render().$el);
    });
    return this;
  },

  buyOrder: function(event){
    this.addToOrders(event, true);
  },

  sellOrder: function(event){
    this.addToOrders(event, false);
  },

  addToOrders: function(event, isBuy){
    event.preventDefault();

    const orderData = {};
    orderData['symbol'] = this.$('select[name=symbol] option:selected').val();
    orderData['buy'] = isBuy;
    const targetPrice = this.$('input[name=price-target]').val();
    if (targetPrice != '') {
      orderData['targetPrice'] = parseFloat(targetPrice);
    }
    const correspondingQuote = this.quoteList.findWhere({symbol: orderData['symbol']});
    orderData['quote'] = correspondingQuote;
    const newOrder = new Order(orderData);
    if (newOrder.isValid()) {
      this.$('.form-errors').empty();
      this.model.add(newOrder);
      newOrder.listenTo(newOrder.get('quote'), 'change', newOrder.quotePriceCheck);
    } else {
      this.displayErrorsFromOrder(newOrder.validationError);
    }
  },

  displayErrorsFromOrder(messageHash) {
    const statusMessagesEl = this.$('.form-errors');
    statusMessagesEl.empty();
    _.each(messageHash, (messageType) => {
      messageType.forEach((message) => {
        statusMessagesEl.append(`<h3>${message}</h3>`);
      })
    });
    statusMessagesEl.show();
  }
});

export default OrderListView;
