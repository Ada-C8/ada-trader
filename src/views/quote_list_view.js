import Backbone from 'backbone';
import QuoteView from '../views/quote_view';
import Quote from '../models/quote';

const QuoteListView = Backbone.View.extend ({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'update', this.render);
  },

  render() {
    this.model.each((quote) => {
      const quoteView = new QuoteView({
        model: quote,
        template: this.template,
        tagName: 'li',
        className: 'quote',
      });

      this.$('#quotes').append(quoteView.render().$el);
      return this;
    });
  },

});
    // this.$('#todo-items').empty();
    // const currentTaskView = new CurrentTaskView({
    //   bus: this.bus,
    //   el: '#selected_task',
    // });
    // currentTaskView.render();
    //
    // this.model.each((task) => {
    //   const taskView = new TaskView({
    //     model: task,
    //     template: this.template,
    //     tagName: 'li',
    //     className: 'task',
    //     bus: this.bus,
    //   });
    //   this.$('#todo-items').append(taskView.render().$el);
    //   // listening to 'edit_me' events from task view
    //   this.listenTo(taskView, 'edit_me', this.editTask);
    // });
    // return this;

export default QuoteListView;



// const TaskListView = Backbone.View.extend ({
//   initialize(params) {
//     this.template = params.template;
//     // in this case model is a collection model
//     this.listenTo(this.model, 'update', this.render);
//     this.bus = params.bus;
//
//     this.listenTo(this.model, 'update', this.render);
//   },
//   events: {
//     'click #add-new-task': 'addTask',
//   },
//   // messageHash looks like:
//   // { name: ['message', 'message'],
//   // assignee: ['message'] }
//   updateStatusMessageFrom(messageHash) {
//     const $statusMessages = this.$('#status-messages');
//     $statusMessages.empty();
//     Object.keys(messageHash).forEach((messageType) => {
//       messageHash[messageType].forEach((message) => {
//         $statusMessages.append(`<li>${message}</li>`);
//       });
//     });
//     $statusMessages.show();
//   },
//   updateStatusMessage(message) {
//     this.updateStatusMessageFrom({
//       'task': [message],
//     });
//   },
//
//   addTask(event) {
//     event.preventDefault();
//
//     const formData = this.getFormData();
//
//     const newTask = new Task(formData);
//     if (newTask.isValid()) {
//       this.model.add(newTask);
//       this.cleaFormData();
//       this.updateStatusMessage(`${newTask.get('task_name')} created!`)
//     } else {
//       this.updateStatusMessageFrom(newTask.validationError);
//       newTask.destroy();
//     }
//   },
//   cleaFormData() {
//     ['task_name', 'assignee'].forEach((field) => {
//       this.$(`#add-task-form input[name=${field}]`).val('');
//     });
//   },
//   getFormData() {
//     const taskData = {};
//     ['task_name', 'assignee'].forEach((field) => {
//       const val = this.$(`#add-task-form input[name=${field}]`).val();
//       if (val != '') {
//         taskData[field] = val;
//       }
//     });
//     return taskData;
//   },
//   render() {
//     // this.$ make it search only within the view
//     this.$('#todo-items').empty();
//     const currentTaskView = new CurrentTaskView({
//       bus: this.bus,
//       el: '#selected_task',
//     });
//     currentTaskView.render();
//
//     this.model.each((task) => {
//       const taskView = new TaskView({
//         model: task,
//         template: this.template,
//         tagName: 'li',
//         className: 'task',
//         bus: this.bus,
//       });
//       this.$('#todo-items').append(taskView.render().$el);
//       // listening to 'edit_me' events from task view
//       this.listenTo(taskView, 'edit_me', this.editTask);
//     });
//     return this;
//   },
//   // parameter task - is the model that we want to edit
//   editTask(task) {
//     this.$('#add-task-form input[name=task_name]').val(task.get('task_name'));
//     this.$('#add-task-form input[name=assignee]').val(task.get('assignee'));
//     // this.model.remove(task);
//     // will remove it from all collections
//     task.destroy();
//
//   },
// });
//
// export default TaskListView;
