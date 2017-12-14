import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    targetPrice: 0.00,
  },
  validate(attributes) {
    const errors = {}

    // If the target price is blank OR is greater than or equal to the current market price:


    if (!attributes.symbol) {
      errors['symbol'] = ["You must select a symbol!"];
    }

    if (!attributes.price) {
      errors['targetPrice'] = ["Your target price cannot be blank!"];
    }

    if ( Object.keys(errors).length > 0 ) {
      return errors;
    } else {
      return false;
    }
  }

});

export default Order;
