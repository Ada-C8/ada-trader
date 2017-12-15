import Backbone from 'backbone';
import OrderView from '../views/order_view';
import Order from '../models/order';

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
    console.log('in addToOrders function at OrderListView');

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
      this.model.add(newOrder);
      newOrder.listenTo(newOrder.get('quote'), 'change', newOrder.quotePriceCheck);
    }
  },

});

export default OrderListView;
