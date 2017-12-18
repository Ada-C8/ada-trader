import Backbone from 'backbone';


const Order = Backbone.Model.extend ({
  initialize(attributes) {

  },
  validate(attributes) {
    const errors = {};
    if (!attributes.symbol) {
      errors['symbol'] = ["You must specify a symbol"];
    }
    if (!attributes.targetPrice) {
      errors['price'] = ["You must specify price."];
    }
    if (this.get('buy') && attributes.targetPrice >= this.get('quote').get('price')) {
      errors['price'] = ["The buy price needs to be less than the current price."]
    }
    if (!this.get('buy') && attributes.targetPrice <= this.get('quote').get('price')) {
      errors['price'] = ["The price is lower than the market price."]
    }
    if ( Object.keys(errors).length > 0 ) {
      return errors;
    } else {
      return false;
    }
  },
});


export default Order;
