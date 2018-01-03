import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  validate(attributes) {
    const errors = {};

    if (!attributes.targetPrice) {
      errors['targetPrice'] = 'A target price is required.';
    }

    if(attributes.buy == "buy" &&
       attributes.targetPrice >= attributes.quote.get('price')) {
      errors['targetPrice'] = ['The target price must be lower than the trade price'];
    }

    if(attributes.buy === "sell" &&
       attributes.targetPrice <= attributes.quote.get('price')){
      errors['targetPrice'] = ['The target price must be higher than the trade price'];
    }

    if ( Object.keys(errors).length > 0 ) {
      return errors;
    } else {
      return false;
    }

  },
});

export default Order;
