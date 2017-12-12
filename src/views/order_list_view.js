import Backbone from 'backbone';
import _ from 'underscore';
import OrderView from '../views/order_view';
import Order from '../models/order'

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'update', this.render);
  },
  render() {
    // Clear the unordered list
    // this.$('#quotes-container').empty();
    // Iterate through the list rendering each Task
    this.model.each((order) => {
      // Create a new TaskView with the model & template
      const orderView = new OrderView({
        model: order,
        template: this.template,
        // tagName: 'li',
        className: 'order',
      });
      // Then render the TaskView
      // And append the resulting HTML to the DOM.
      this.$('#orders').append(orderView.render().$el);
    });
    return this;
  },
  // events: {
  //   'click #add-new-task': 'addTask'
  // },
  // addTask: function(event) {
  //   event.preventDefault();
  //   const taskData = {};
  //   ['task_name', 'assignee'].forEach( (field) => {
  //     const val = this.$(`#add-task-form input[name=${field}]`).val();
  //     if (val != '') {
  //       taskData[field] = val;
  //     }
  //   });
  //   const newTask = new Task(taskData);
  //
  //   if (newTask.isValid()) {
  //     this.model.add(newTask);
  //     this.updateStatusMessageWith(`New task added: ${newTask.get('task_name')}`);
  //   } else {
  //     this.updateStatusMessageFrom(newTask.validationError);
  //   }
  // },
  // updateStatusMessageFrom: function(messageHash) {
  //   const statusMessagesEl = this.$('#status-messages');
  //   statusMessagesEl.empty();
  //   _.each(messageHash, (messageType) => {
  //     messageType.forEach((message) => {
  //       statusMessagesEl.append(`<li>${message}</li>`);
  //     })
  //   });
  //   statusMessagesEl.show();
  // },
  // updateStatusMessageWith: function(message) {
  //   const statusMessagesEl = this.$('#status-messages');
  //   statusMessagesEl.empty();
  //   statusMessagesEl.append(`<li>${message}</li>`);
  //   statusMessagesEl.show();
  // }
});

export default OrderListView;
