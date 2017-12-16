import Backbone from 'backbone';

const Order = Backbone.Model.extend({

// add validations and messaging to the user here
  validate(attributes) {
    const errors = {};
    const marketPrice = attributes.quotePrice;
    const action = attributes.buy;

    // must have a price
    if (!attributes.targetPrice) {
      errors['targetPrice'] = ["Target Price is required"];
    } else {
      const targetPrice = attributes.targetPrice
      if (!action && targetPrice <= marketPrice ) {
        // selling
        console.log('selling');
        errors['targetPrice'] = ["When Selling - The Target Price must be greater than the current market price."]
      } else if (action && targetPrice >= marketPrice) {
        // buying
        console.log('buying');
        errors['targetPrice'] = ["When Buying - Target Price must be less than the current market price."]
      }
    }


    // validate that the sell price is greater than the current market Price
    // validate that the buy price is less than the current market Price
    if ( Object.keys(errors).length > 0 ) {
      console.log(errors);
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
