import Backbone from 'backbone';
import Order from 'models/order';
import OrderView from 'views/order_view';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.bus = params.bus;
    this.template = params.template;

    // SEE CHECK VALIDATION METHOD FOR THE .ADD TO THE COLLECTION FOR TRIGGERED EVENT
    this.listenTo(this.model, 'update', this.renderOpenOrders);

    // SEE QUOTE_LIST_VIEW RENDER() FOR THE TRIGGER
    this.listenTo(this.bus, 'append_symbols', this.renderDropDown);

    // this.listenTo(this.b)
  },

  events: {
    // TODO: PUT THESE IN THEIR OWN FUNCTIONS
    'click form button.btn-buy': 'createBuyOrder',
    'click form button.btn-sell': 'createSellOrder',
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

  createBuyOrder(event) {
    event.preventDefault();
    this.$('.form-errors').empty();

    // TODO: Make this into a separate function - get form data
    const orderData = this.getFormData();

    // TODO: Make this into a separate function create order based on click selection
    // A new order is created for each submission
    const order = new Order({
      symbol: orderData['symbol'],
      targetPrice: parseInt(orderData['targetPrice']),
      buy: true,
    });
    // SEE QUOTE VIEW LIST FOR THE LISTEN TO
    this.trigger('compareToMarketPrice', order);

    // Check model validations
    this.checkValidations(order);
  },

  ////////////////////////// DISPLAY SELL ORDER ////////////////////////

  createSellOrder(event) {
    event.preventDefault();
    this.$('.form-errors').empty();

    const orderData = this.getFormData();

    // TODO: Make this into a separate function create order based on click selection

    const order = new Order({
      symbol: orderData['symbol'],
      // console.log(`selectedPrice === String`);
      targetPrice: parseInt(orderData['targetPrice']),
      buy: false,
    });

    // TODO: How do we check the target price of the current market price? When we submit the order form?

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

  ////////////////////////// CLEAR FORM //////////////////////////

  clearFormData() {
    this.$('form input[name=price-target]').val('');
    this.$('form-errors').empty();
  },

});

export default OrderListView;
