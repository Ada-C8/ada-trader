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

    // If the target price is blank OR is greater than or equal to the current market price:
    if (!attributes.symbol) {
      errors['symbol'] = ["You must select a symbol!"];
    }

    if (!attributes.targetPrice) {
      // console.log('This is my price in validations: ' + attributes.price);
      errors['targetPrice'] = ["Your target price cannot be blank!"];
    }
    //
    // if (attributes.price === String) {
    //   errors['targetPrice'] = ["Your target must be an integer"];
    // }

    if ( Object.keys(errors).length > 0 ) {
      return errors;
    } else {
      return false;
    }
  },

});

export default Order;
