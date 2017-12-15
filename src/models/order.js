import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    targetPrice: 0.00,
  },

  initialize(attributes) {
  },

  validate(attributes) {
    const errors = {}

    if (!attributes.symbol) {
      errors['symbol'] = ["You must select a symbol!"];
    }

    // if (attributes.targetPrice === String) {
    //   errors['noString'] = ["Please enter an integer"];
    // }

    if (!attributes.targetPrice) {
      errors['targetPrice'] = ["Your target price cannot be blank!"];
    }

    if (attributes.targetPrice === 0) {
      errors['targetPrice'] = ["Please enter a number higher than 0!"];
    }


    if ( Object.keys(errors).length > 0 ) {
      return errors;
    } else {
      return false;
    }
  },
}); // Order

export default Order;
