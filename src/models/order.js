import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    targetPrice: 0.00
  },
  validate(attributes) {
    const errors = {};

    if (!attributes.targetPrice) {
      errors.targetPrice = ["Price is required"];
    }

    if (attributes.targetPrice === 0) {
      errors.targetPrice = ["A valid price is required"];
    }
    //TODO ADD more validations to make sure a symbol is present and only valid numbers are entered (not zero, not a string)

    if ( Object.keys(errors).length > 0 ) {
      return errors;
    } else {
      return false;
    }
  },

});

export default Order;
