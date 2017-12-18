import Backbone from 'backbone';

import OrderView from './order_view';
import Order from '../models/order';
// import TradeHistoryView from './trade_history_view';

// params:   const orderListView = new OrderListView({
  //   el: '#orders-container',
  //   model: orderList,
  //   template: orderTemplate,
  //   bus: bus,
  // });

const OrderListView = Backbone.View.extend({

  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'update', this.render);
  },
  render(){
    this.$('.orders').empty();
    console.log("In the render function for order list view")

    this.model.each((order) => {

      const orderView = new OrderView({
        model: order,
        template: this.template,
        tagName: 'li',
        className: 'order',
        bus: this.bus,
      }); // end orderView const

      this.$('.orders').append(orderView.render().$el);

    }); // end each

    return this;
  },

  events: {
    'click button.btn-buy': 'createBuyOrder',
    'click button.btn-sell': 'createSellOrder',
    'mouseover': 'testthis',
  },


// adding to quote list here?
  testthis(event) {
    event.preventDefault();
    // alert("This is where the el is!");
  },

  createBuyOrder(event) {
    event.preventDefault();
    console.log("you clicked the buy button");
    // this.model.createOrder();
    // this.addOpenOrder(true)
  },

  createSellOrder(event) {
    event.preventDefault();
    console.log("you clicked the sell button");
  }

}); //end orderlistview



export default OrderListView;
