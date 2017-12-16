import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    targetPrice: 0.00,
    buy: true,
  },
  // validate: function(attributes) {
  //   const errors = {};
  //   if (!attributes.targetPrice) {
  //     errors['targetPrice'] = ['Cannot be blank'];
  //   } else if (isNaN(attributes.targetPrice)) {
  //     errors['targetPrice'] = ['Must be a number'];
  //   } else if (attributes.targetPrice >= 1000 || attributes.publication_year > (new Date()).getFullYear()) {
  //     errors['publication_year'] = ['Must be between 1000 and this year'];
  //   }
  //
  //   // Return false if it's valid,
  //   // or something truthy (i.e. the errors) if it's not valid
  //   if (Object.keys(errors).length > 0) {
  //     return errors;
  //   } else {
  //     return false;
  //   }
  // }
});

export default Order;
