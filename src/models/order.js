import Backbone from 'backbone';

const Order = Backbone.Model.extend({

// add validations and messaging to the user here
  validate(attributes) {
    const errors = {};

    if (!attributes.targetPrice) {
      errors['targetPrice'] = ["Target Price is required"];
    }

    const quotePrice = attributes.get('quotePrice');
    const action = attributes.get('buy');

    // validate that the sell price is greater than the current market Price


    // validate that the buy price is less than the current market Price


    if ( Object.keys(errors).length > 0 ) {
      return errors;
    } else {
      return false;
    }
  },


});

export default Order;


// Selling
// target price must exist and be is greater than the current market price
//
// BUY
// target price must exist and be less than to the current market price
