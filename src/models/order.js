import Backbone from 'backbone';
import _ from 'underscore';

const Order = Backbone.Model.extend({

  initialize(attributes) {
  },

  validate(attributes) {
    const errors = {};
    if (!attributes.price) {
      errors['price'] = ["Price required"];
    }
    if (this.get('buy') && attributes.price >= this.get('quote').get('price')) {
      errors['price'] = ["autoBuy Price must be less than quote's current price"];
    }
    if (!this.get('buy') && attributes.price <= this.get('quote').get('price')) {
      errors['price'] = ["autoSell Price must be greater than quote's current price"];
    }

    if ( Object.keys(errors).length > 0 ) {
      return errors;
    } else {
      return false;
    }
  },

  autoBuy() {
    let quote = this.get('quote');

    if (this.get('targetPrice') >= quote.get('price') ||
    this.get('targetPrice') === '') {

      quote.buy();
      return true;
    }
    return false;
  },

  autoSell() {
    let quote = this.get('quote');

    if (this.get('targetPrice') <= quote.get('price') ||
    this.get('targetPrice') === '') {

      quote.sell();
      return true;
    }
    return false;
  }

});

export default Order;
