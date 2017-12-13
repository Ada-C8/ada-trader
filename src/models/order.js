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

      if (!attributes.targetPrice) {
        errors['targetPrice'] = ['Price is required'];
      }

      if (attributes.targetPrice <= 0) {
        errors['targetPrice'] = ['Price must be greater than 0']
      }

      if ( Object.keys(errors).length > 0 ) {
        return errors;
      } else {
        return false;
      }
  },

});

export default Order;
