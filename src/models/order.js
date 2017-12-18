import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  initialize(attributes) {
    this.buy = attributes.buy;
    this.targetPrice = attributes.targetPrice;
    this.symbol = attributes.symbol;
  },

  validate(attributes) {
    const errors = {};
    if (!attributes.targetPrice) {
      errors['price'] = 'Invalid target price!';
    }

    if (Object.keys(errors).length > 0) {
      return errors;
    } else {
      return false;
    }
  },
});

export default Order;
