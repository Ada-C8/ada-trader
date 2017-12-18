import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  validate(attributes) {
    const errors = {};

    if(!attributes.targetPrice || attributes.targetPrice <= 0) {
      errors['price'] = ['Invalid target price'];
    }

    if (this.get('buy') && attributes.targetPrice >= this.get('quote').get('price')) {
      errors['price'] = ['Price higher than market price!'];
    }
    
    if (!this.get('buy') && attributes.targetPrice <= this.get('quote').get('price')) {
      errors['price'] = ['Price lower than market price!'];
    }

    if ( Object.keys(errors).length > 0 ) {
      return errors;
    } else {
      return false;
    }
  }
});

export default Order;
