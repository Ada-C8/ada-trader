import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  defaults: {
    targetPrice: 0.00
  },
  validate(attributes) {
    const errors = {};
    let wantQuote = attributes.quotes.models.filter(quote => (quote.attributes.symbol === attributes.symbol));

    if (!attributes.symbol) {
      errors['symbol'] = ["Quote symbol is required"];
    }
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
    if ( Object.keys(errors).length > 0 ) {
      return errors;
    } else {
      return false;
    }
  },
});

export default Order;
