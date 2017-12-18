import Backbone from 'backbone';

import OrderView from './order_view';
import Order from '../models/order';


const OrderListView = Backbone.View.extend({

  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'update', this.render);
    this.listenTo(this.bus, 'send_quotes', this.getQuotes);

  },
  render(){
    this.$('.orders').empty();

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

    if (newOrder.isValid()) {
      this.model.add(newOrder);
      console.log("instance was added");
      this.clearFormData();
    } else {
      this.updateStatusMessageFrom(newOrder.validationError);
      newOrder.destroy();
    }
  },

  getOrderData(buy) {
    const orderData = {};

    orderData["symbol"] = this.$(`#order-entry-form #symbol option:checked`).val();
    let stringPrice = this.$(`#order-entry-form input[name=price-target]`).val();
    orderData["targetPrice"] = parseFloat(stringPrice);
    orderData["buy"] = buy;
    // let stockQuote = orderData[symbol];
    this.bus.trigger('get_quote', this.model);
    // trigger getQuote

    return orderData;
  },


  clearFormData() {
    this.$(`#order-entry-form input[name=price-target]`).val('');
  },

  getQuotes(quotelist){
    console.log("in get quotes");
    this.quoteList = quotelist;
    console.log(this.quoteList);
  },
    // this.listenTo(this.bus, 'send_quotes', this.getQuotes);
  // validateOrderData {
  //   if (orderData[targetPrice] === '' || orderData[targetPrice] >= currentprice) {
  //
  //   },
  updateStatusMessageFrom(messageHash) {
    const $formErrors = this.$('.form-errors');
  }




}); //end orderlistview



export default OrderListView;
