import Backbone from 'backbone';
import Order from '../models/order';
import OrderView  from './order_view';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    // add template, bus, and quotes
    this.template = params.template;
    this.bus = params.bus;
    this.quotes = params.quotes;

    // listens for changes in our template
    this.listenTo(this.model, 'update', this.render);
  },

  // events object
  events:{
    'click button.btn-buy, button.btn-sell': 'addOrder',
  },

  render() {
    console.log('inside order list view render function');
    // Clear the DOM Elements so we can redraw them
    this.$('#orders').empty();
    // Iterate through the list rendering each order
    this.model.each((order) => {
      // create a new OrderView with the model and template
      const orderView = new OrderView({
        model: order,
        template: this.template,
        tagName: 'li',
        className: 'order',
        bus: this.bus,
      });
      // Then render the Order and append the resulting HTML to the document
      this.$('#orders').append(orderView.render().$el);
    });
    this.renderOrderForm();
    return this;
  },

  // function to draw the order form dropdown selection options
  renderOrderForm() {
    // add symbols to dropdown menu in the form
    const quoteData = this.quotes.map( x => x.get('symbol'));
    quoteData.forEach((symbol) => {
      const option = `<option value="${symbol}">${symbol}</option>`;
      this.$('form select').append(option);
    });
  },

  // function that gets called when buy or sell button in view get clicked on, will validate and add an order or make a call to show user error messages
  addOrder(event){
    console.log('inside addOrder method');
    event.preventDefault();
    // get form data
    const formData = this.getFormData();
    formData['buy'] = event.target.classList[0] === ("btn-buy")  ? true : false;
    // console.log(`formData[buy]: ${formData['buy']}`);
    // new instance of OrderView using form formData
    const newOrder = new Order(formData);

    if (newOrder.isValid()){
      // add order and clear form formData
      console.log('new order is valid!');
      this.model.add(newOrder);
      const action = newOrder.get('buy') ? 'buy' : 'sell';
      this.updateStatusMessage(`Successfully added a ${action} open order for ${newOrder.get('symbol')}`);
      this.clearFormData();
      console.log(newOrder);
    } else {
      console.log('new order is invalid!');
      // get rid of task and give user feedback on error handling
      // console.log('order validation error');
      // console.log(newOrder.validationError);
      this.updateStatusMessage(newOrder.validationError)
      newOrder.destroy();
    }
  },

  // helper function to get symbol and target price from the form
  getFormData() {
    console.log('in getFormData method');
    let orderData = {};

    orderData['symbol'] = this.$(`#order-form select[name="symbol"]`).val();
    orderData['targetPrice'] = Number(this.$('#order-form input[name="price-target"]').val());

    // get the current price of the quote
    orderData['quotePrice'] = this.quotes.findWhere({'symbol': orderData['symbol']}).get('price');

    return orderData;
  },

  // function to clear form
  clearFormData() {
    console.log('in clearFormData');
    // reset to the first quotes symbol and clear price value
    this.$(`#order-form select[name="symbol"]`).val(this.quotes.models[0].get('symbol'));
    this.$('#order-form input[name="price-target"]').val('');
  },

  // method to show validation error messages or success messages to the user based on their form input
  updateStatusMessage(message) {
    // jQuery select spot where we want to add messages
    const $statusMessages = this.$('.form-errors');
    // clear the messages
    $statusMessages.empty();
    // append the message to the DOM
    $statusMessages.append(`<p>${message}</p>`);
  },

});

export default OrderListView;
