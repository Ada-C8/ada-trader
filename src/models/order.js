import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  initialize(attributes) {
    //raise an error if you didn't get a quote
  },
  validate(attributes) {
    const errors = {};

    if (!attributes.symbol) {
      errors['symbol'] = ['Symbol is required'];
    }

    if (!attributes.targetPrice) {
      errors['price-target'] = ['Invalid target price'];
    }

    if (attributes.targetPrice <= 0) {
      errors['price-target'] = ['Invalid target price'];
    }

    //BUY: if order's target price is greater than quote's price (bad)
    if (attributes.buy && (attributes.targetPrice > attributes.matchedQuote.get('price')) ) {
      errors['price-target'] = ['Price higher than market price!'];
    }

    //SELL: if order's target price is less than quote's price
    if (!attributes.buy && (attributes.targetPrice < attributes.matchedQuote.get('price')) ) {
      errors['price-target'] = ['Price lower than market price!'];
    }

    if ( Object.keys(errors).length > 0 ) {
      return errors;
    } else {
      return false;
    }
  },

});

export default Order;
