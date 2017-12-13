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

    if (!attributes.task_name) { //all tasks require a task name
      errors['task_name'] = ["Task name is required"];
    }

    if ( Object.keys(errors).length > 0 ) {
      return errors;
    } else {
      return false;
    }
  },
});

export default Order;
