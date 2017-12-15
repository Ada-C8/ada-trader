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

    // SEE QUOTE VIEW LIST RENDER()
    this.listenTo(this.bus, 'checkQuotePrice', this.checkQuotePrice);
  },

  events: {
    // TODO: PUT THESE IN THEIR OWN FUNCTIONS???
    'click form button.btn-buy': 'createBuyOrder',
    'click form button.btn-sell': 'createSellOrder',
  },

  //////////// RENDER ORDERS AFTER ADDING TO THE COLLECTION //////////////

  render() {
    this.$('#orders').empty();

    this.model.each((lastOrder) => {
      const orderView = new OrderView({
        model: lastOrder,
        template: this.template,
        tagName: 'li',
        className: 'order',
        bus: this.bus,
      });

      this.$('#orders').append(orderView.render().$el);
    });
    return this;
  },

  //////////// RENDER DROPDOWN OPTIONS BASED ON QUOTES AVAILABLE //////////////

  renderDropDown(quotes) {
    let $selectOptions = this.$('select[name=symbol]');

    quotes.forEach((quote) => {
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

    // SEE CHECK SUBMITTED ORDER PRICE in QUOTE LIST VIEW
    this.bus.trigger('compareToMarketPrice', order);
  },

  ////////////////////////// CREATE SELL ORDER ////////////////////////

  createSellOrder(event) {
    event.preventDefault();
    this.$('.form-errors').empty();

    const orderData = this.getFormData();

    const order = new Order({
      symbol: orderData['symbol'],
      targetPrice: parseFloat(orderData['targetPrice']),
      buy: false,
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

  ////////////////////////// CLEAR FORM //////////////////////////

  clearFormData() {
    this.$('form input[name=price-target]').val('');
    this.$('form-errors').empty();
  },

  ////////////////////////// ERROR DISPLAY ////////////////////////

  displayOrderErrors(errors) {
    const $errorDisplay = this.$('.form-errors');
    $errorDisplay.empty();

    // Iterate over errors hash and display the values
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

  ///////////////// CHECK PRICE OF ORDERS TO QUOTES ///////////////////

  checkQuotePrice(quote) {
    const orders = this.model.where({symbol: quote.get('symbol')});

    if (orders.length > 0) {
      orders.forEach((order) => {
        if (quote.get('price') < order.get('targetPrice')) {
          let trade = {
            // TODO: make order price the same name as quote attributes
            symbol: order.get('symbol'),
            price: order.get('targetPrice'),
            buy: order.get('buy'),
          };

          // SEE TRADE VIEW FUNCTION
          this.bus.trigger('add_quote', trade);
          this.model.remove(order);
          order.destroy(); // Trggers a render() in this collection
        }
      });
    }
  },
});

export default OrderListView;
