import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  defaults: {
    is_traded: false,
  },
  validate: function(attributes) {
    const errors = {};

    if (!attributes.symbol) {
      errors['symbol'] = ["Symbol is required"];
    }

    if (!attributes.targetPrice) {
      errors['price_target'] = ["Target price is required"];
    }

    if (attributes.buy && attributes.targetPrice >= attributes.currentPrice) {
      errors['price_target'] = ["Buy order target price cannot be greater than the current market price."]
    }

    if (!attributes.buy && attributes.targetPrice <= attributes.currentPrice) {
      errors['price_target'] = ["Sell order target price cannot be less than the current market price."]
    }
  },
});

export default Order;
