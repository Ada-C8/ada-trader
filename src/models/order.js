import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  initialize(params) {
    this.buy = params.buy,
    this.currentQuote = params.currentQuote,
    this.currentPrice = params.currentPrice,
    this.targetPrice = params.targetPrice
  },

  validate(attributes) {
    const error = {};
    if (this.buy && this.targetPrice >= this.currentPrice) {
      error.targetPrice = ['Price is higher than market, aim lower!'];
    }
    else if (!this.buy && this.targetPrice <= this.currentPrice) {
      error.targetPrice = ['Price is lower than market, aim higher!'];
    }
    else if (!attributes.targetPrice) {
      error.targetPrice = ['Price must not be blank!'];
    }

    if (Object.keys(error).length < 1) {
      return error;
    } else {
      return false;
    }
  },
});

export default Order;
