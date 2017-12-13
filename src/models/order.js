import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  // defaults: {
  //   symbol: 'UNDEF',
  //   price: 0.00,
  // },
  initialize(attributes) {
  },

  validate(attributes) {
    const errors = {};

    //TODO: validate for specific symbols?
    if (!attributes.symbol) { //all orders require a symbol
      errors['symbol'] = ['A symbol is required'];
    }

    if (!attributes.price) {
      errors['price'] = ['A price is required']
    }

    if ( Object.keys(errors).length > 0 ) {
      return errors;
    } else {
      return false;
    }
  },
});

export default Order;
