import Backbone from 'backbone';

import OrderView from './order_view';
import Order from '../models/order';
// import TradeHistoryView from './trade_history_view';


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
  },


  // adding to quote list here?


  createBuyOrder(event) {
    event.preventDefault();
    console.log("you clicked the buy button");
    this.createOrder(true);
  },

  createSellOrder(event) {
    event.preventDefault();
    console.log("you clicked the sell button");
    this.createOrder(false);
  },

  createOrder(buy) {
    console.log("We're triggering the create order event!");
    const orderData = this.getOrderData(buy);
    console.log(orderData);
    const newOrder = new Order(orderData);
    this.model.add(newOrder);
    console.log("instance was added");
    this.clearFormData();
    // this.bus.trigger('createOrder', order_data);
  },

  getOrderData(buy) {
    const orderData = {};

    orderData["symbol"] = this.$(`#order-entry-form #symbol option:checked`).val();
    let stringPrice = this.$(`#order-entry-form input[name=price-target]`).val();
    orderData["targetPrice"] = parseFloat(stringPrice);
    orderData["buy"] = buy;
    this.bus.trigger('get_quote', orderData[symbol]);
    // trigger getQuote

    return orderData;
  },

  // getQuote(stock){
  //
  // },

  clearFormData() {
    this.$(`#order-entry-form input[name=price-target]`).val('');
},

  // validateOrderData {
  //   if (orderData[targetPrice] === '' || orderData[targetPrice] >= currentprice) {
  //
  //   },





}); //end orderlistview



export default OrderListView;
