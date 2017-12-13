import Backbone from 'backbone';

import Order from '../models/order';
import OrderView from './order_view';


const OrdersView = Backbone.View.extend({
  initialize(params){
    this.bus = params.bus;
    this.template = params.template;
    this.allSymbols = params.allSymbols;
    this.listenTo(this.model, 'update', this.render);
    this.listenTo(this.bus, 'price_check_response', this.priceCheckResponse)
  },

  priceCheckResponse(response) {
    if (response) {
      const newOrder = new Order(response);

      if (newOrder.isValid()) {
        console.log('Model is ALL valid');
        this.clearFormData();

        const successMessage = {
          order: `New order for ${newOrder.get('symbol')} created!`
        };
        this.updateStatusMessageForForm(successMessage);
        console.log('New Order symbol');
        console.log(newOrder.symbol);
        this.model.add(newOrder);

      } else {
        console.log('ERROR');

        this.updateStatusMessageForForm(newOrder.validationError);
        newOrder.destroy();
      }
    } else {
      const errorMessage = {
        order: `New order not created. Price must be less than the current price!`
      };
      this.updateStatusMessageForForm(errorMessage)
    }
  },

  getFormData(buySell){
    console.log('In getFormData');
    const orderData = {};

    console.log(this.$('form select').find(":selected").val());

    //get selected dropdown
    const selectedSymbol = this.$('form select').find(":selected").val();
    orderData.symbol = selectedSymbol;

    //get value for price
    const selectedPrice = this.$('form input').val();
    orderData.targetPrice = selectedPrice;

    //get buy/sell
    const tradeType = buySell;
    if (tradeType === 'buy') {
      orderData.buy = true;
    } else if (tradeType === 'sell') {
      orderData.buy = false;
    }
    console.log('New Order Data:');
    console.log(orderData);
    return orderData;
  },

  clearFormData(){
    this.$('form select').find(":selected").val('');
    this.$('form input').val('');
  },

  updateStatusMessageForForm(messageHash) {
    console.log('UpdateStatusMessageForForm: messageHash');
    console.log(messageHash);
    console.log(messageHash.order);

    const $statusMessages = this.$('.form-errors');
    $statusMessages.empty();

    for (let key in messageHash) {
      $statusMessages.append(`<p>${key}: ${messageHash[key]}</p>`);
    }
  },

  addBuyOrder(event){
    event.preventDefault();
    console.log('In addBuyOrder');
    console.log('EVENT:');
    const buy = 'buy';

    const formData = this.getFormData(buy);
    console.log('Back in addBuyOrder:');
    console.log(formData.symbol);
    console.log(formData.targetPrice);
    console.log(formData.buy);

    this.bus.trigger('add_order_request', formData);
    //
    // const newOrder = new Order(formData);
    // // const currentQuote = new
    //
    // if (newOrder.isValid()) {
    //   console.log('Model is valid');
    //   this.clearFormData();
    //
    //   //trigger event on bus to quotes to check price is below the quote price
    //
    //   this.bus.trigger('add_order_request', formData);
    //
    //   //TODO: how to just do it selectively by symbol? Below thought seems dangerous
    //   // if (newOrder.symbol === "HUMOR") {
    //   //   this.bus.trigger('add_humor_order_request', formData);
    //   // } else if (newOrder.symbol === "CLOTH") {
    //   //   this.bus.trigger('add_cloth_order_request', formData);
    //   // }
    //
    //   const successMessage = {
    //     order: `New order for ${newOrder.get('symbol')} created!`
    //   };
    //   this.updateStatusMessageForForm(successMessage);
    //   console.log('New Order symbol');
    //   console.log(newOrder.symbol);
    //   this.model.add(newOrder);
    //
    // } else {
    //   console.log('ERROR');
    //
    //   this.updateStatusMessageForForm(newOrder.validationError);
    //   newOrder.destroy();
    // }
  },

  addSellOrder(event){
    event.preventDefault();
    console.log('In addSellOrder');
    console.log('EVENT:');

    const buy = 'sell';

    const formData = this.getFormData(buy);
    console.log('Back in addBuyOrder:');
    console.log(formData.symbol);
    console.log(formData.targetPrice);
    console.log(formData.buy);

    const newOrder = new Order(formData);

    if (newOrder.isValid()) {
      console.log('Model is valid');
      this.clearFormData();

      const successMessage = {
        order: `New order for ${newOrder.get('symbol')} created!`
      };
      this.updateStatusMessageForForm(successMessage);
      console.log('New Order symbol');
      console.log(newOrder.symbol);
      this.model.add(newOrder);

    } else {
      console.log('ERROR');

      this.updateStatusMessageForForm(newOrder.validationError);
      newOrder.destroy();
    }
  },

  events: {
    'click button.btn-buy': 'addBuyOrder',
    'click button.btn-sell': 'addSellOrder',
  },

  render() {
    console.log('In OrdersView render');
    console.log(this.allSymbols);

    this.$('#orders').empty();
    this.$('form select').empty();

    this.allSymbols.forEach((symbol) => {
      this.$('select[name="symbol"]').append(`<option>${symbol}</option>`)
      // this.$('form select').append(`<option>${symbol}</option>`)
    });

    this.model.each((order) => {
      const orderView = new OrderView({
        model: order,
        template: this.template,
        tagName: 'li',
        className: 'order',
        bus: this.bus,
      });

      this.$('#orders').append(orderView.render().$el);
      // this.listenTo(taskView, 'edit_me', this.editTask)
    });
    return this;
  },

});

export default OrdersView;
