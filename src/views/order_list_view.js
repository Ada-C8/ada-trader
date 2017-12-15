import Backbone from 'backbone';
import Order from '../models/order'
import OrderView from '../views/order_view'
import OrderList from '../collections/order_list';
import _ from 'underscore';

const OrderListView = Backbone.View.extend({
  initialize(params){
    this.template = params.template;
    this.gobble = params
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
    'click button.btn-sell': 'sellOrder'
  },

  buyOrder(e){
    e.preventDefault();
    // this.trigger(this, 'appendOrder')
    console.log("Trying to buy!")
    this.appendOrder(true);

  },

  sellOrder(e) {
    e.preventDefault();
    console.log("Trying to sell!")
    this.appendOrder(false)
  },

  appendOrder(isBuy) {
    let orderData = {
      buy: isBuy
    }

    orderData.symbol = this.$(`[name='symbol']`).val();
    orderData.targetPrice = parseFloat(this.$(`[name='price-target']`).val());
    const order = new Order(orderData);
    console.log(order)
    this.model.add(order);
    console.log(this.model)
    this.render();
  }

})

export default OrderListView;
