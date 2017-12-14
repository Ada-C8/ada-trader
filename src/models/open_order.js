import Backbone from 'backbone';

const OpenOrder = Backbone.Model.extend({
  initialize(attributes) {
  },

  validate(attributes){
    const errors = {};

    if (!attributes.targetPrice) {
      errors['targetPrice'] = ["Price is required"];
    }

    if ( Object.keys(errors).length > 0 ) {
      return errors;
    } else {
      return false;
    }
  },


});
export default OpenOrder;
