import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    priceTarget: 0.00,
    buy: null,
    quote: null,
  },
  validate: function(attributes) {
    const errors = {};
    if (!attributes.symbol) {
      errors['symbol'] = ['You must select a stock']; // Not sure necessary
    }

    if (attributes.buy === null) {
      errors['Trade'] = ['You must select buy or sell']; // Not sure necessary
    }

    if (!attributes.quote) {
      errors['Stock'] = ['Uh Oh! Something went terribly wrong']; // Not sure necessary
    }
    const quotePrice = attributes.quote[0].attributes.price;

    if (!attributes.priceTarget) {
      errors['Price'] = ['Price cannot be blank'];
    } else if (isNaN(attributes.priceTarget)) {
      errors['Price'] = ['Price must be a numeric value'];
    } else if (attributes.priceTarget <= quotePrice && attributes.buy === false) {
      errors['Price'] = ['Price is lower than Market Price!'];
    } else if (attributes.priceTarget >= quotePrice && attributes.buy) {
      errors['Price'] = ['Price is higher than Market Price!'];
    }

    if (Object.keys(errors).length > 0) {
      return errors;
    } else {
      return false;
    }
  }
});

export default Order;
