import Backbone from 'backbone';
import QuoteView from './quote_view';
import Quote from '../models/quote';

const TaskListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    // this.bus = params.bus;

    this.listenTo(this.model, 'update', this.render);
  },

  render() {
    this.$('#quotes').empty(); //ul #quotes

    this.model.each((quote) => {
      const quoteView = new QuoteView({
        model: quote,
        // bus: this.bus,
        template: this.template,
        tagName: 'li', // creates an element to put the template in
        className: 'quote', //adds a class to the element
      });
      // this.listenTo(taskView, 'edit_event', this.editTask);
      this.$('#quotes').append(quoteView.render().$el);
    });

    return this;
  },

  // events: {
  //   'click #add-new-task': 'addTask',
  // },
  //
  // updateStatusMessageFrom(messageHash) {
  //   const $statusMessages = this.$('#status-messages');
  //   $statusMessages.empty();
  //   Object.keys(messageHash).forEach((messageType) => {
  //     messageHash[messageType].forEach((message) => {
  //       $statusMessages.append(`<li>${message}</li>`);
  //     });
  //   });
  //   $statusMessages.show();
  // },
  //
  // updateStatusMessage(message) {
  //   this.updateStatusMessageFrom({
  //     'task': [message],
  //   });
  // },
  //
  // addTask(event) {
  //   event.preventDefault();
  //
  //   const formData = this.getFormData();
  //   const newTask = new Task(formData);
  //
  //   if (!newTask.isValid()) {
  //     newTask.destroy();
  //     this.updateStatusMessageFrom(newTask.validationError);
  //     return;
  //   }
  //
  //   this.model.add(newTask);
  //   this.clearFormData();
  //   // this.$('#status-messages').hide();
  //   this.updateStatusMessage(`${newTask.get('task_name')} Created!`)
  // },
  //
  // getFormData() {
  //   const taskData = {};
  //   ['task_name', 'assignee'].forEach((field) => {
  //     const val = this.$(`#add-task-form input[name=${field}]`).val();
  //     if (val !== '') {
  //       taskData[field] = val;
  //     }
  //   });
  //
  //   return taskData;
  // },
  // clearFormData() {
  //   ['task_name', 'assignee'].forEach((field) => {
  //     const val = this.$(`#add-task-form input[name=${field}]`).val('');
  //   });
  // },
  //
  //
  // editTask(task) {
  //   // this.model.remove(task);
  //   this.$('#add-task-form input[name=task_name]').val(task.get('task_name'));
  //   this.$('#add-task-form input[name=assignee]').val(task.get('assignee'));
  //   task.destroy();
  // },



});

export default TaskListView;
