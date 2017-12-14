import Backbone from 'backbone';
import Order from 'models/order';
import OrderView from 'views/order_view';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.bus = params.bus;
    this.template = params.template;

    // SEE QUOTE_LIST_VIEW RENDER() FOR THE TRIGGER
    this.listenTo(this.bus, 'append_symbols', this.render);
  },

  events: {
    'submit form': 'displayBoughtOrder',
  },

  render(quotes) {
    let $selectOptions = this.$('select[name=symbol]');
    quotes.forEach((quote) => {

      // Append the current symbol and then append the price
      $selectOptions.append(`<option value="${quote.get('symbol')}">${quote.get('symbol')}</option>`);

      // this.model.add(order); // TODO: COME BACK TO THIS!
    });
  },

    ////////////////////////// ERROR HANDLING ////////////////////////
  displayBoughtOrder(event) {
    event.preventDefault();
    this.$('.form-errors').empty();

    let selectedSymbol = this.$('form select[name=symbol]').val();
    let selectedPrice = this.$('form input[name=price-target]').val();
    console.log('This is my selected Price: ' + selectedPrice);
    console.log('This is my selected Symbol' + selectedSymbol);

    // A new order is created for each submission
    const order = new Order({
      symbol: selectedSymbol,
      targetPrice: selectedPrice,
    });

    console.log('Order symbol: ' + order.get('symbol'));
    console.log('Order targetPrice: ' + order.get('targetPrice'));

    ////////////////////////// CHECK VALIDATIONS ////////////////////////
    if (order.isValid()) {
      // console.log('This is the model:' + this.model);
      console.log('this is this: ' + this);
      this.model.add(order);
      this.clearFormData();
    } else {
      this.displayOrderErrors(order.validationError);
      order.destroy();
    }
  },

  ////////////////////////// ERROR DISPLAY ////////////////////////
  displayOrderErrors(errors) {
    const $errorDisplay = this.$('.form-errors');
    $errorDisplay.empty();

    // Iterate over errors hash and display
    Object.keys(errors).forEach((key) => {
      $errorDisplay.append(`<p>${errors[key]}</p>`);
    });
  },

  ////////////////////////// CLEAR FORM //////////////////////////
  clearFormData() {
    this.$('form input[name=price-target]').val('');
    this.$('form select[name=symbol]').val('');
    this.$('form-errors').empty(); // TODO: Do I need this?
  },
});


export default OrderListView;
