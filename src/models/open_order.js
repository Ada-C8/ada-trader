import Backbone from 'backbone';

const OpenOrder = Backbone.Model.extend({
  initialize(attributes) {
  },
  validate(attributes) {
    const errors = {};

    if (!attributes.targetPrice) {
      errors['target_price'] = ["Price cannot be blank."];
    }

    if (attributes.buy && attributes.targetPrice >= attributes.quote.get('price')) {
      errors['target_price'] = ["The price you listed for a buy order is greater than or equal to the current quote price."];
    }

    if (!attributes.buy && attributes.targetPrice <= attributes.quote.get('price')) {
      errors['target_price'] = ["The price you listed for a sell order is less than or equal to the current quote price."];
    }

    if ( Object.keys(errors).length > 0 ) {
      return errors;
    } else {
      return false;
    }
  },
});

export default OpenOrder;
