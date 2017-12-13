import Backbone from 'backbone';

import Order from '../models/order';


const OrdersView = Backbone.View.extend({
  initialize(params){
    this.bus = params.bus;
    this.template = params.template;
    this.allSymbols = params.allSymbols;
    // this.listenTo(this.model, 'update', this.render);
  },

  getFormData(){
    console.log('In getFormData');
    const orderData = {};

    console.log(this.$('form select').find(":selected").val());

    //get selected dropdown
    const selectedSymbol = this.$('form select').find(":selected").val();
    orderData.symbol = selectedSymbol;

    //get value for price
    const selectedPrice = this.$('form input').val();
    orderData.price = selectedPrice;

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
    // $statusMessages.show();
  },

  addBuyOrder(event){
    event.preventDefault();
    console.log('In addBuyOrder');

    const formData = this.getFormData();
    const newOrder = new Order(formData);

    if (newOrder.isValid()) {
      console.log('Model is valid');
      this.model.add(newOrder);
      this.clearFormData();

      const successMessage = {
        order: `New order for ${newOrder.get('symbol')} created!`
      };
      this.updateStatusMessageForForm(successMessage);
    } else {
      console.log('ERROR');

      this.updateStatusMessageForForm(newOrder.validationError);
      // this.updateStatusMessageFrom(newTask.validationError);
      //.validationError has all errors
      // newTask.destroy();
    }
  },

  addSellOrder(event){
    event.preventDefault();
    console.log('In addSellOrder');

  },

  events: {
    'click button.btn-buy': 'addBuyOrder',
    'click button.btn-sell': 'addSellOrder',
  },

  render() {
    console.log('In OrdersView render');
    console.log(this.allSymbols);

    this.allSymbols.forEach((symbol) => {
      this.$('select[name="symbol"]').append(`<option>${symbol}</option>`)
      // this.$('form select').append(`<option>${symbol}</option>`)

    });
    return this;
  },

});

export default OrdersView;
