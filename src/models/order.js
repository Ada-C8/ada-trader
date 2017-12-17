import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00,
    buy: false,
  },

  validate(attributes) {
    const errors = {}

    if (!attributes.symbol) {
      errors['symbol'] = "You must select a symbol!";
    }
    if (!attributes.price) {
      errors['price'] = "Your target price cannot be blank!";
    }
    if (attributes.price === 0) {
      errors['price'] = "Please enter a number higher than 0!";
    }
    if ( Object.keys(errors).length > 0 ) {
      return errors;
    } else {
      return false;
    }
  },
}); // Order

export default Order;
