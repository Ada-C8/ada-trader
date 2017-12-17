import Backbone from 'backbone';

const Order = Backbone.Model.extend({

// add validations and messaging to the user here
  validate(attributes) {
    let errors;
    const marketPrice = attributes.quotePrice;
    const buy = attributes.buy; // buy or sell - buy is true - sell is false

    // must have a targetPrice
    if (!attributes.targetPrice) {
      errors = "Target Price is required";
    } else {
      const targetPrice = attributes.targetPrice
      if (!buy && targetPrice <= marketPrice ) {
        // selling - targetPrice must be greater than the marketPrice
        console.log('selling');
        errors = "When Selling - The Target Price must be greater than the current market price.";
      } else if (buy && targetPrice >= marketPrice) {
        // buying - the targetPrice must be less than the marketPrice
        console.log('buying');
        errors = "When Buying - Target Price must be less than the current market price.";
      }
    }


    if (errors) {
      return errors;
    } else {
      return false;
    }
  },
});

export default Order;
