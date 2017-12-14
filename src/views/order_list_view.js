import Backbone from 'backbone';
import Order from 'models/order';
import OrderView from 'views/order_view';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.bus = params.bus;
    this.template = params.template;

    // SEE CHECKVALIDATION METHOD FOR THE .ADD TO THE COLLECTION FOR TRIGGERED EVENT
    this.listenTo(this.model, 'update', this.renderOpenOrders);

    // SEE QUOTE_LIST_VIEW RENDER() FOR THE TRIGGER
    this.listenTo(this.bus, 'append_symbols', this.renderDropDown);
  },

  events: {
    // TODO: PUT THESE IN THEIR OWN FUNCTIONS
    'click form button.btn-buy': 'displayBuyOrder',
    'click form button.btn-sell': 'displaySellOrder',
  },

  renderDropDown(quotes) {
    let $selectOptions = this.$('select[name=symbol]');
    quotes.forEach((quote) => {

      // Append the current symbol and then append the price
      $selectOptions.append(`<option value="${quote.get('symbol')}">${quote.get('symbol')}</option>`);

      // this.model.add(order); // TODO: COME BACK TO THIS!
    });
  },

  ////////////////////////// DISPLAY BUY ORDER ////////////////////////

  displayBuyOrder(event) {
    event.preventDefault();
    this.$('.form-errors').empty();

    // // TODO: Make this into a separate function - get form data
    // let selectedSymbol = this.$('form select[name=symbol]').val();
    // let selectedPrice = this.$('form input[name=price-target]').val();
    const orderData = this.getFormData();

    // TODO: Make this into a separate function create order based on click selection
    // A new order is created for each submission
    const order = new Order({
      symbol: orderData['symbol'],
      // console.log(`selectedPrice === String`);
      targetPrice: parseInt(orderData['targetPrice']),
      buy: true,
    });

    // Check model validations
    this.checkValidations(order);
  },

  ////////////////////////// DISPLAY SELL ORDER ////////////////////////

  displaySellOrder(event) {
    event.preventDefault();
    this.$('.form-errors').empty();

    // TODO: Make this into a separate function
    // let selectedSymbol = this.$('form select[name=symbol]').val();
    // let selectedPrice = this.$('form input[name=price-target]').val();
    const orderData = this.getFormData();

    // TODO: Make this into a separate function create order based on click selection
    // A new order is created for each submission
    const order = new Order({
      symbol: orderData['symbol'],
      // console.log(`selectedPrice === String`);
      targetPrice: parseInt(orderData['targetPrice']),
      buy: false,
    });

    // Check model validations
    this.checkValidations(order); // TODO: Come back to this
  },

  ////////////////////////// GET FORM DATA ////////////////////////
  getFormData() {
    const data = {};
    data['symbol'] = this.$('form select[name=symbol]').val();
    data['targetPrice'] = this.$('form input[name=price-target]').val();
    return data;
  },

  //////////// RENDER ORDERS AFTER ADDING TO THE COLLECTION //////////////

  renderOpenOrders(event) {
    this.model.each((order) => {
      const orderView = new OrderView({
        model: order,
        template: this.template,
        tagName: 'li',
        bus: this.bus,
        className: 'order',
      });
      // console.log(this.template);

      // console.log(orderView.render());
      this.$('#orders').append(orderView.render().$el);
    });
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
    this.$('form-errors').empty();
  },

  ////////////// CHECK VALIDATIONS AND TRIGGER UPDATE ///////////////

  checkValidations(order) {
    if (order.isValid()) {
      // Triggers update on a collection
      this.model.add(order);
      this.clearFormData();
    } else {
      this.displayOrderErrors(order.validationError);
      order.destroy();
    }
  },
});

export default OrderListView;
