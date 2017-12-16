import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    targetPrice: 0.00,
    buy: true,
  },
  validate: function(attributes) {
    const errors = {};
    if (!attributes.targetPrice) {
      errors['targetPrice'] = ['Invalid target price'];
    } else if (isNaN(attributes.targetPrice)) {
      errors['targetPrice'] = ['Invalid target price'];
    } else if (attributes.buy == true && attributes.targetPrice >= attributes.currentQuotePrice) {
      errors['targetPrice'] = ['Price higher than market price!'];
    }  else if (attributes.buy == false && attributes.targetPrice <= attributes.currentQuotePrice) { errors['targetPrice'] = ['Price lower than market price!'];
    }

    // Return false if it's valid,
    // or something truthy (i.e. the errors) if it's not valid
    if (Object.keys(errors).length > 0) {
      return errors;
    } else {
      return false;
    }
  }
});

export default Order;
