import Backbone from 'backbone';
import Order from 'models/order';
import OrderView from 'views/order_view';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.bus = params.bus;
    this.template = params.template;

    // SEE CHECK VALIDATION METHOD FOR THE .ADD TO THE COLLECTION FOR TRIGGERED EVENT
    this.listenTo(this.model, 'update', this.render);

    // SEE QUOTE_LIST_VIEW RENDER() FOR THE TRIGGER
    this.listenTo(this.bus, 'append_symbols', this.renderDropDown);

    // SEE QUOTE_LIST_VIEW submittedOrderPRICE FOR TRIGGER
    this.listenTo(this.bus, 'checkValidations', this.checkValidations);

    // SEE QUOTE VIEW LIST VIEW
    this.listenTo(this.bus, 'checkQuotePrice', this.checkQuotePrice);
  },

  events: {
    // TODO: PUT THESE IN THEIR OWN FUNCTIONS???
    'click form button.btn-buy': 'createBuyOrder',
    'click form button.btn-sell': 'createSellOrder',
  },

  // TODO: use the render() method which is it's own method that can be used with this

  renderDropDown(quotes) {
    let $selectOptions = this.$('select[name=symbol]');

    quotes.forEach((quote) => {
      // Append the current symbol and then append the price
      $selectOptions.append(`<option value="${quote.get('symbol')}">${quote.get('symbol')}</option>`);
    });
  },

  ////////////////////////// CREATE BUY ORDER ////////////////////////

  createBuyOrder(event) {
    event.preventDefault();
    this.$('.form-errors').empty(); // TODO: Do I need this?

    const orderData = this.getFormData();

    const order = new Order({
      symbol: orderData['symbol'],
      targetPrice: parseFloat(orderData['targetPrice']),
      buy: true,
    });

    // SEE CHECKSUBMITTED ORDER PRICE in QUOTE LIST VIEW
    this.bus.trigger('compareToMarketPrice', order);
  },

  ////////////////////////// CREATE SELL ORDER ////////////////////////

  createSellOrder(event) {
    event.preventDefault();
    this.$('.form-errors').empty(); // TODO: Do I need this?

    const orderData = this.getFormData();

    const order = new Order({
      symbol: orderData['symbol'],
      targetPrice: parseFloat(orderData['targetPrice']),
      // buy: false,
    });

    this.bus.trigger('compareToMarketPrice', order);
  },

  ////////////////////////// GET FORM DATA ////////////////////////

  getFormData() {
    const data = {};
    data['symbol'] = this.$('form select[name=symbol]').val();
    data['targetPrice'] = this.$('form input[name=price-target]').val();
    return data;
  },

  //////////// RENDER ORDERS AFTER ADDING TO THE COLLECTION //////////////

  render() {
    // Append the last order only
    if (this.model.length > 0) {
      const lastOrder = this.model.at(this.model.length - 1);
      const orderView = new OrderView({
        model: lastOrder,
        template: this.template,
        tagName: 'li',
        className: 'order',
        bus: this.bus,
      });

      this.$('#orders').append(orderView.render().$el);
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

  /////////////// CHECK PRICE OF ORDERS TO QUOTES ///////////////////

  checkQuotePrice(quote) {
    const orders = this.model.where({symbol: quote.get('symbol')});

    // console.log(orders.length);
    // console.log(orders);
    if (orders.length > 0) {
      orders.forEach((order) => {
        // if (quote.get('price') < order.get('targetPrice')) {
          // How do we access the view of a model that already exists?
          order.destroy();
          this.model.remove(order);
          // order.destroy();
          // console.log('This is the model: ' + this.model);
          // console.log('This is the order: ' + order.get('symbol'));
          // // order.remove({silent: true});
          // // order.destroy({silent: true});
          // console.log("This model does not exist" + order);
      });
      console.log(this.model.length);
    }
  },
});

export default OrderListView;

// TODO: When saving my order, does the checking of the price to the current quote price need to be when the model is saved? Or can it be a custom error?
