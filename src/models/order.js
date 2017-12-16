import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  validate(attributes) {
    const errors = {};
    if (!attributes.symbol || attributes.symbol === '') {
      errors['symbol'] = ["Quote symbol is required"];
    }

    let wantQuote = attributes.quotes.models.filter(quote => (quote.attributes.symbol === attributes.symbol));
    if (wantQuote.length === 0) {
      errors['symbol'] = ["Symbol must match a currently existing quote"];
    }

    if (typeof(attributes.targetPrice) != 'number') {
      errors['price'] = ["Price must be a number"];
    }
    if (!attributes.targetPrice || attributes.targetPrice === '') {
      errors['price'] = ["Must have a target price"];
    }
    if (attributes.targetPrice <= 0) {
      errors['price'] = ["Target price must be a positive number"];
    }

    if (!errors['symbol']) {
      if (attributes.buy) {
        if (attributes.targetPrice >= wantQuote[0].attributes.price) {
          errors['targetPrice'] = ["Target price is higher than current market cost."];
        }
      }
      if (attributes.buy == false) {
        if (attributes.targetPrice <= wantQuote[0].attributes.price) {
          errors['targetPrice'] = ["Target price is less than current market cost."];
        }
      }
    }
    
    if ( Object.keys(errors).length > 0 ) {
      return errors;
    } else {
      return false;
    }
  },
});

export default Order;
