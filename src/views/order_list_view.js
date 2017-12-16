import Backbone from 'backbone';
import Order from '../models/order';
import OrderView  from './order_view';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    // save template
    this.template = params.template;
    // add bus
    this.bus = params.bus;

    // add symbols
    this.symbols = params.symbols;

    // listens for changes in our template
    this.listenTo(this.model, 'update', this.render);
  },

  render() {
    console.log('inside order list view render function');
    console.log(this.symbols);

    this.$('#order-from select').html('');
    this.symbols.forEach((symbol) => {
      const option = `<option value="${symbol}">${symbol}</option>`;
      console.log(option);
      this.$('form select[name="symbol"]').append(option);
    });



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
    return this;

    // add sybols to the form

  },
});

export default OrderListView;
