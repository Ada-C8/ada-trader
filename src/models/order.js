import Backbone from 'backbone';

const Order = Backbone.Model.extend({

// need to do validations
  validate(attributes) {

    const errors = {};
    // create a hash for errors

    if(!attributes.symbol) {
      errors['symbol'] = ['Need to know what your buying or selling'];
      //if there's no symbol, give this message
    }

    if(!attributes.targetPrice) {
      errors['targetPrice'] = ['Please enter a target price'];
    }

    if(attributes.buy && ( attributes.targetPrice >= attributes.quote.get('price') ) ){
        errors['buyPriceError'] = ['Your offered price higher than the current price.'];
        console.log("too high to get over");
    }

    if(attributes.buy === false && (attributes.targetPrice <= attributes.quote.get('price'))) {
        errors['sellPriceError'] = ['Your offered price is lower than the current price.'];
        console.log("too low to get under");
    }

    if ( Object.keys(errors).length > 0) {
      return errors;
      //if there are errors, return them
    } else {
      return false;
    }
  },

  cancelOrder() {
    console.log("we're cancelling your order!");
    this.destroy();//
  },
});

export default Order;
