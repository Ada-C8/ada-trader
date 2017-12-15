import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  defaults: {

  },
  initalize(attributes) {

  },
  validate(attributes) {
    const errors = {};
    if (!attributes.price) {
      errors['price'] = ["Price is required"];
    }
    if ( Object.keys(errors).length > 0 ) {
      return errors;
    } else {
      return false;
    }
  },

});

export default Order;
