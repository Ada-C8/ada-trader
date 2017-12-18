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
    this.createOrder();

  },

  // createSellOrder(event) {
  //   event.preventDefault();
  //   console.log("you clicked the sell button");
  //   this.createOrder(false);
  // },

  createOrder() {
    console.log("We're triggering the create order event!");
    const orderData = this.getOrderData();
    console.log(orderData);
    const newOrder = new Order(orderData);
    this.model.add(newOrder);
    console.log("instance was added");
    // this.bus.trigger('createOrder', order_data);
  },

  getOrderData() {
    const orderData = {};
    ['symbol', 'price-target'].forEach((field) => {
      const val = this.$(`#order-entry-form input[name=${field}]`).val();
      // get the value of the element
      if (val !== ''){
        orderData[field] = val;
      }
    });

    return orderData;
  },

  // <form id="order-entry-form">
  //   <label for="symbol">Symbol</label>
  //   <select id="symbol" name="symbol">
  //     <!-- Option entries should be added here using JavaScript -->
  //   </select>
  //   <label for="price-target">Price</label>
  //   <input type="number" name="price-target" step="0.10" min="0.00" placeholder="100.00" />
  //   <label>Action</label>
  //   <button id="buy-order" class="btn-buy alert button">Buy</button>
  //   <button id="sell-order" class="btn-sell success button">Sell</button>
  // </form>



}); //end orderlistview



export default OrderListView;
