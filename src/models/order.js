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
      errors.targetPrice = ["Cannot enter a zero value for the target price."];
    }

    if (NaN(attributes.targetPrice)) {
      errors.targetPrice = ["A valid price is required"];
    }


    if (attributes.buy &&  attributes.targetPrice >= attributes.marketPrice ) {
      // console.log('Price is higher than or equal to market value');
      errors.targetPrice = ["Price is great than or equal to market price"];
    }

    if (!attributes.buy &&  attributes.targetPrice <= attributes.marketPrice ) {
      // console.log('Price is higher than or equal to market value');
      errors.targetPrice = ["Price is less than or equal to market price"];
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
