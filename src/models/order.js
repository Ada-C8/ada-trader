import Backbone from 'backbone';

const Order = Backbone.Model.extend({

  //need to do validations first, then call if !valid, in orderlistview... and then check against the price expectations...
    // validations
  validate(attributes) {
    let errors;
    if (!attributes.targetPrice) {
      errors = 'Must enter a target price';
    }

    if ( errors ) {
      return errors;
    } else {
      return false;
    }
  },

});

export default Order;
