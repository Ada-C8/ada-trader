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
  toString() {
    return `task_name: ${this.get('task_name')}, assignee: ${this.get('assignee')}`;
  },

  //add toggleComplete method to flip it
  toggleComplete() {
    this.set('is_complete', !this.get('is_complete'));

    // if (this.is_complete) {
    //   this.is_complete = false;
    // } else {
    //   this.is_complete = true;
    // }
  }
});

export default Order;
