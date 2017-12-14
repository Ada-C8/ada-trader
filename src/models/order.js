import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  validate(attributes) {
    let errors;
    if (!attributes.targetPrice) {
      errors = 'A target price is required.';
    }

    if ( errors ) {
      return errors;
    } else {
      return false;
    }
  },
});

export default Order;
