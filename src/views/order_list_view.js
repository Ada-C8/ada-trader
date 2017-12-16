import Backbone from 'backbone';
import Order from '../models/order';
import OrderView  from './order_view';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    // add template, bus, and symbols array
    this.template = params.template;
    this.bus = params.bus;
    this.symbols = params.symbols;

    // listens for changes in our template
    this.listenTo(this.model, 'update', this.render);
  },

  render() {
    console.log('inside order list view render function');
    // Clear the DOM Elements so we can redraw them
    this.$('#orders').empty();
    // Iterate through the list rendering each order
    this.model.each((order) => {
      // create a new OrderView with the model and template
      const orderView = new OrderView({
        model: Order,
        template: this.template,
        tagName: 'li',
        className: 'order',
        bus: this.bus,
      });
      // Then render the Order and append the resulting HTML to the document
      this.$('#orders').append(orderView.render().$el);
    });
    this.renderOrderForm()
    return this;
  },

  renderOrderForm() {
    // add symbols to dropdown menu in the form
    this.symbols.forEach((symbol) => {
      const option = `<option value="${symbol}">${symbol}</option>`;
      this.$('form select').append(option);
    });
  },

  addOrder(event){
    console.log('inside addOrder method');
    event.preventDefault();
    // get form data
    const fromData = this.getFormData();
    // new instance of OrderView using form fromData
    // const newOrder = new Task(formData);
  },
  // helper function to get form data
  getFormData() {
    console.log('in getFormData method');
    let orderData = {};

    orderData['symbol'] = this.$(`#order-form select[name="symbol"]`).val();
    // orderData['quote'] = this.quotes.where({symbol: orderData['symbol']})[0];
    orderData['targetPrice'] = Number(this.$('#order-form input[name="price-target"]').val());

    console.log(orderData);
  },

  // events object
  events:{
    'click button.btn-buy, button.btn-sell': 'addOrder',
  },
});

export default OrderListView;
