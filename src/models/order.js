import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  defaults: {

  },
  initialize(attributes) {
  },
  validate(attributes) {
    const errors = {};
    if (!attributes.price) {
      errors['price'] = ["Price is required"];
    }
    if (this.get('buy') && attributes.price >= this.get('quote').get('price')) {
      errors['price'] = ["Buy Price must be less than quote's current price"];
    }
    if (!this.get('buy') && attributes.price <= this.get('quote').get('price')) {
      errors['price'] = ["Sell Price must be greater than quote's current price"];
    }

    if ( Object.keys(errors).length > 0 ) {
      return errors;
    } else {
      return false;
    }
  },

});

export default Order;
