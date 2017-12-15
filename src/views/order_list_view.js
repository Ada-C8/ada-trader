import Backbone from 'backbone';
import OrderList from '../collections/order_list';
import _ from 'underscore';

const OrderListView = Backbone.View.extend({
  initalize(params){
    this.template = params.template,
    this.listenTo(this.model, "change", this.render)
  },

  render() {
    // this.$('orders').empty();
    this.model.each((order) => {
      const orderView = new OrderView({
        bus: this.bus,
        model: order,
        template: this.template,
        tagName: 'li',
        className: 'order'
      });
      this.bus.listenTo(orderView, 'appendOrder', this.appendOrder)
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
    console.log("Trying to buy!")
    console.log(this.$el)

  },

  sellOrder(e) {
    e.preventDefault();
    console.log("Trying to sell!")
  },

  appendOrder() {
    let symbol = this.symbol
  }

})

export default OrderListView;
