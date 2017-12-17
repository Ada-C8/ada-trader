import Backbone from 'backbone';

const Order = Backbone.Model.extend({

// add validations and messaging to the user here
  validate(attributes) {
    const errors = [];
    const marketPrice = attributes.quotePrice;
    const action = attributes.buy; // buy or sell - buy is true - sell is false

    // must have a targetPrice
    if (!attributes.targetPrice) {
      errors.push("Target Price is required");
    } else {
      const targetPrice = attributes.targetPrice
      if (!action && targetPrice <= marketPrice ) {
        // selling - targetPrice must be greater than the marketPrice
        console.log('selling');
        errors.push("When Selling - The Target Price must be greater than the current market price.");
      } else if (action && targetPrice >= marketPrice) {
        // buying - the targetPrice must be less than the marketPrice
        console.log('buying');
        errors.push("When Buying - Target Price must be less than the current market price.");
      }
    }


    if ( Object.keys(errors).length > 0 ) {
      return errors;
    } else {
      return false;
    }
  },
});

export default Order;
