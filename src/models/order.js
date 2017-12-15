import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  // defaults: {
  //   symbol: 'undefined',
  //   targetPrice: 0.00,
  // },
  validate(attributes) {
    // const errors = {};
    // if (!attributes.symbol) {
    //   errors['symbol'] = ['symbol cannot be blank'];
    // }
    // // if (!attributes['price-target'] || parseInt(attributes['price-target']) <= 0) {
    // //   errors['price-target'] = ['price-target cannot be blank or less than 1'];
    // // }
    //
    // if (Object.key(errors).length > 0) {
    //   return errors;
    // } else {
    //   return false;
    // }
  }
});

export default Order;
