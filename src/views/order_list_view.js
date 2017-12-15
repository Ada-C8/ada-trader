import Backbone from 'backbone';
import Order from '../models/order'
import OrderView from '../views/order_view'
import OrderList from '../collections/order_list';
import _ from 'underscore';

const OrderListView = Backbone.View.extend({
  initialize(params){
    this.template = params.template;
    this.quotes = params.quotes
    console.log("hello?")
    // this.listenTo(this.model, "change", this.render);
    this.listenTo(this.model, "update", this.render);
  },

  render() {
    this.$('#orders').empty();
    this.model.each((order) => {
      const orderView = new OrderView({
        bus: this.bus,
        model: order,
        template: this.template,
        tagName: 'li',
        className: 'order'
      });
      this.$('#orders').append(orderView.render().$el);
    })
    return this
  },

  events: {
    'click button.btn-buy': 'buyOrder',
    'click button.btn-sell': 'sellOrder',
    'click button.btn-cancel': 'cancelOrder'
  },

  buyOrder(e){
    e.preventDefault();
    this.appendOrder(true);

  },

  sellOrder(e) {
    e.preventDefault();
    this.appendOrder(false)
  },

  appendOrder(isBuy) {
    let orderData = {
      buy: isBuy
    }

    orderData.symbol = this.$(`[name='symbol']`).val();
    orderData.targetPrice = parseFloat(this.$(`[name='price-target']`).val());
    orderData.quote = this.quotes.findWhere({symbol: orderData.symbol})
    const order = new Order(orderData);
    this.model.add(order);
    console.log(order);
  },

})

export default OrderListView;
