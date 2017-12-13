import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  validate: function(attributes) {
    const errors = {};
    if (!attributes.targetPrice) {
      errors['Price'] = ['cannot be blank'];
    } else if (isNaN(attributes.targetPrice)) {
      errors['Price'] = ['must be a number - leave off $']
    }
    if (Object.keys(errors).length > 0) {
      return errors;
    } else {
      return false;
    }
  }
});

export default Order;
