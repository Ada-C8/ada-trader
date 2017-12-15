import Backbone from 'backbone';

const OpenOrder = Backbone.Model.extend({
  initialize(attributes) {
  },
  // TODO: validations
  validate(attributes) {
    const errors = {};
    if (!attributes.targetPrice) {
      errors['target_price'] = ["Price cannot be blank."];
      console.log('error')
    }
    // TODO: get CurrentMarketPrice from quote
//     If the target price is blank OR is greater than or equal to the current market price:
// That order is not created and an appropriate error message is displayed beneath the form
    // if buy is true
    // if (attributes.buy && attributes.targetPrice >= CurrentMarketPrice) {
    //   errors['target_price'] = ["Price cannot be blank."];
    // }
    // if (!attributes.task_name) {
    //   errors['task_name'] = ["Task name is required"];
    // }
    //
    if ( Object.keys(errors).length > 0 ) {
      return errors;
    } else {
      return false;
    }
  },
});

// Click Buy in the order entry form:
// If the target price is blank OR is greater than or equal to the current market price:
// That order is not created and an appropriate error message is displayed beneath the form
// If the target price is less than to the current market price:
// A new Buy order is added to the bottom of the open orders list, with the:
// Symbol from the the form
// Target price from the form
// Click Sell in the order entry form:
// If the target price is blank OR is less than or equal to the current market price:
// That order is not created and an appropriate error message is displayed beneath the form
// If the target price is greater than the current market price:
// A new Sell order is added to the bottom of the open orders list, with the:
// Symbol from the the form
// Target price from the form

export default OpenOrder;
