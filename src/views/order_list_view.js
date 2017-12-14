import Backbone from 'backbone';
import OrderView from '../views/order_view';
import Order from '../models/order';

const OrderListView = Backbone.View.extend({

  initialize(params){
    this.template = params.template;
    this.quotes = params.quotes;
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

        const correspondingQuote = this.quotes.findWhere({symbol: order.get('symbol')});
        this.listenTo(correspondingQuote, 'change', orderView.fulfillOrder, correspondingQuote);
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
    console.log('in addToOrders function at OrderListView');

    const orderData = {};
    orderData['symbol'] = this.$('select[name=symbol] option:selected').val();
    orderData['buy'] = isBuy;
    const targetPrice = this.$('input[name=price-target]').val();
    if (targetPrice != '') {
      orderData['targetPrice'] = parseFloat(targetPrice);
    }
    const newOrder = new Order(orderData);
    if (newOrder.isValid()) {
      this.model.add(newOrder);
    }
  },

});

export default OrderListView;
