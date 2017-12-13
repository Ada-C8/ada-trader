import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  validate(attributes) {
    const errors = {};
    if (!attributes.targetPrice) {
      errors['targetPrice'] = ['A target price is required.'];
    }

    if ( Object.keys(errors).length > 0 ) {
      return errors;
    } else {
      return false;
    }
  },
});

export default Order;
