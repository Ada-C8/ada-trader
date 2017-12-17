import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  validate(attributes) {
    const errors = {};

    if(!attributes.price) {
      errors['price'] = ['Price is required'];
    }

  }
});

export default Order;
