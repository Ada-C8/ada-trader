import Backbone from 'backbone';
import OrderView from './order_view';
import Order from '../models/order';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.quoteList = params.quoteList;
    this.listenTo(this.model, 'update', this.render);
  },

  render() {
    this.$('#orders').empty();

    this.model.forEach((order) => {
        const orderView = new OrderView({
          model: order,
          template: this.template,
          tagName: 'li',
          className: 'order',
          bus: this.bus,
        });
        this.$('#orders').append(orderView.render().$el);
    });
    return this;
  },

  events: {
    'click button.btn-buy': 'buyOrder',
    'click button.btn-sell': 'sellOrder',
  },

  buyOrder: function(event){
    this.addOrder(event, 'buy');
  },

  sellOrder: function(event){
    this.addOrder(event, 'sell');
  },

  addOrder: function(event, action){
    event.preventDefault();

    const orderData = {};
    orderData['symbol'] = this.$('select[name=symbol] option:selected').val();
    orderData['buy'] = action;
    const targetPrice = this.$('input[name=price-target]').val();
    orderData['targetPrice'] = parseFloat(targetPrice);
    const quoteMatch = this.quoteList.findWhere({symbol: orderData['symbol']});
    orderData['quote'] = quoteMatch;

    const newOrder = new Order(orderData);
    console.log(newOrder);
    this.model.add(newOrder);
  },
});

export default OrderListView;
