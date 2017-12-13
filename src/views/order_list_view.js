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

  addBuyOrder(event){
    event.preventDefault();
    console.log('In addBuyOrder');
    //create new model
    //puts new model in order view

    const formData = this.getFormData();
    const newOrder = new Order(formData);

    if (newOrder.isValid()) {
      console.log('Model is valid');
      this.model.add(newOrder);
      this.clearFormData();
      // this.updateStatusMessage(`${newTask.get('task_name')} Created!`)
    } else {
      console.log('ERROR');
      // this.updateStatusMessageFrom(newTask.validationError); //.validationError has all errors
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
