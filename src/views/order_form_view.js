import Backbone from 'backbone';
import $ from 'jquery';

import Order from '../models/order';

const OrderFormView = Backbone.View.extend({
  initialize(params) {
    this.quotes = params.quotes;
    this.bus = params.bus;
  },
  events: {
    'click .btn-buy': 'buyOrder',
    'click .btn-sell': 'sellOrder',
  },
  // getQuote(symbol) {
  //   return this.quotes.findWhere({symbol: symbol});
  // },
  // getCurrentPrice(quote) {
  //   return quote.get('price');
  // },
  createOrder(buyOption) {
    const sym = $('#symbol').val();
    const orderData = {
      quotes: this.quotes,
      bus: this.bus,
      symbol: sym,
      targetPrice: Number($('form input[name="price-target"]').val()),
      buy: buyOption.buy,
      // marketPrice: this.getCurrentPrice(this.getQuote(sym))
    };

    return new Order(orderData);
  },
  
  buyOrder: function(event) {
    event.preventDefault();
    this.clearErrors();

    const order = this.createOrder({buy: true});

    this.validate(order);
    this.$el.find('form').trigger('reset');
  },

  sellOrder: function(event) {
    event.preventDefault();
    this.clearErrors();

    const order = this.createOrder({buy: false});

    this.validate(order);
    this.$el.find('form').trigger('reset');
  },

  validate(order) {
    if (order.isValid()) {
      this.bus.trigger('addOrder', order);
    } else {
      this.renderError(order.validationError);
    }
  },

  clearErrors() {
    this.$('.form-errors').empty();
  },

  renderError(errors) {
    const errorSection = this.$('.form-errors');
    Object.keys(errors).forEach((field) => {
      errors[field].forEach((error) => {
        const html = `<p class="error-message small-6 cell">${field}: ${error}</p>`;
        errorSection.append(html);
      });
    });
  },

});

export default OrderFormView;
