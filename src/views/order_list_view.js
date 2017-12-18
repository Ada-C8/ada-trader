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
    if (!response.order) {
      const newOrder = new Order(response);

      if (newOrder.isValid()) {
        console.log('Model is all valid');
        this.clearFormData();

        const successMessage = {
          order: `New order for ${newOrder.get('symbol')} created!`
        };
        this.updateStatusMessageForForm(successMessage);

        this.model.add(newOrder);

      } else {
        console.log('Model is invalid');

        this.updateStatusMessageForForm(newOrder.validationError);
        newOrder.destroy();
      }
    } else {
      this.updateStatusMessageForForm(response)
    }
  },

  getFormData(buySell){
    console.log('In getFormData');
    const orderData = {};

    //get selected dropdown
    const selectedSymbol = this.$('form select').find(":selected").val();
    orderData.symbol = selectedSymbol;

    //get value for price
    const selectedPrice = this.$('form input').val();
    orderData.targetPrice = selectedPrice;

    //get buy/sell
    orderData.buy = buySell;

    return orderData;
  },

  clearFormData(){
    this.$('form select').find(":selected").val('');
    this.$('form input').val('');
  },

  updateStatusMessageForForm(messageHash) {
    console.log('UpdateStatusMessageForForm: messageHash');
    console.log(messageHash);

    const $statusMessages = this.$('.form-errors');
    $statusMessages.empty();

    for (let key in messageHash) {
      $statusMessages.append(`<p>${key}: ${messageHash[key]}</p>`);
    }
  },

  addBuySellOrder(event) {
    event.preventDefault();
    console.log('In addBuySellOrder');

    if (event.target.innerHTML === 'Buy') {
      const buy = true;

      const formData = this.getFormData(buy);
      console.log('Back in addBuyOrder:');

      this.bus.trigger('add_order_request', formData)

    } else if (event.target.innerHTML === 'Sell') {
      const buy = false;
      const formData = this.getFormData(buy);

      this.bus.trigger('add_order_request', formData);
    }
  },

  events: {
    'click button.btn-buy': 'addBuySellOrder',
    'click button.btn-sell': 'addBuySellOrder',
  },

  render() {
    console.log('In OrdersView render');

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
    });
    return this;
  },

});

export default OrdersView;
