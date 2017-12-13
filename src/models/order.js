import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  defaults: {
    symbol: '',
    targetPrice: '',
    buy: '',
  },
  initialize(attributes) {
  },
  validate(attributes) {
    const errors = {};

    console.log(attributes);

      if (!attributes.targetPrice) {
        errors['targetPrice'] = ['Price is required'];
      }

      if (attributes.targetPrice <= 0) {
        errors['targetPrice'] = ['Price must be greater than 0']
      }

      if (attributes.buy === true && parseFloat(attributes.targetPrice) > parseFloat(attributes.marketPrice)) {
        errors['targetPrice'] = ['Buy order price too high']
      }
      console.log(errors);
      console.log(parseFloat(attributes.targetPrice))
      console.log(parseFloat(attributes.marketPrice))
      console.log(parseFloat(attributes.targetPrice) > parseFloat(attributes.marketPrice))

      if (attributes.buy === false && parseFloat(attributes.targetPrice) < parseFloat(attributes.marketPrice)) {
        errors['targetPrice'] = ['Sell order price too low']
      }

      console.log(errors);
      console.log(parseFloat(attributes.targetPrice))
      console.log(parseFloat(attributes.marketPrice))
      console.log(parseFloat(attributes.targetPrice) < parseFloat(attributes.marketPrice))

      if ( Object.keys(errors).length > 0 ) {
        return errors;
      } else {
        return false;
      }
  },

});

export default Order;
