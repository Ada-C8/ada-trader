import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  initialize(params) {
    this.currentQuote = params.currentQuote,
    this.currentPrice = params.currentPrice,
    this.buy = params.buy,
    this.targetPrice = params.targetPrice
  },

  validate(attributes) {
    const errors = {};
    if (!attributes.targetPrice) {
      errors.targetPrice = ['Target price can\'t be blank'];
    }
    else if (this.buy && this.targetPrice >= this.currentPrice) {
      errors.targetPrice = ['Target price can\'t be greater than or equal to the current market price'];
    }
    else if (!this.buy && this.targetPrice <= this.currentPrice) {
      errors.targetPrice = ['Target price can\'t be less than or equal to the current market price'];
    }

    if (Object.keys(errors).length < 1) {
      return false;
    }
    return errors;
  },

});

export default Order;
