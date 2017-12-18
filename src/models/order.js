import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  initialize(params) {
    this.buy = params.buy;
    this.targetPrice = params.targetPrice;
    this.symbol = params.symbol;
    this.quotes = params.quotes;
  },

  validate(params) {
    const errors = {};
    if (!params.targetPrice) {
      errors['price'] = 'Invalid target price!';
    }

    // if (params.targetPrice >= matchingQuote.attributes.price) {
    //   errors['buy'] = 'Less than current market price'
    // }

    if (Object.keys(errors).length > 0) {
      return errors;
    } else {
      return false;
    }
  },
});

export default Order;
