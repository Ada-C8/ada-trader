import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;

  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);

    return this;
  },
  
})

// import Backbone from 'backbone';
// import Task from '../models/task';
//
// const TaskView = Backbone.View.extend({
//   initialize(params) {
//     this.template = params.template;
//     this.bus = params.bus;
//
//     // listen for change and when it happens I'll do render
//     this.listenTo(this.model, 'change', this.render);
//   },
//   // render function draws the views
//   render() {
//     const compiledTemplate = this.template(this.model.toJSON());
//
//     if (this.model.get('is_complete')) {
//       this.$el.addClass('is-complete');
//       // this.$('button.toggle-complete').html('Set Incomplete');
//       // console.log(`select button: ${this.$('button.toggle-complete')}`);
//     } else {
//       this.$el.removeClass('is-complete');
//     }
//
//     // el - html element that contains that block (so we're going to fill this container this view is responsible for)
//     // $el - JS selected element
//     this.$el.html(compiledTemplate);
//     // convention, everything we render we need to return 'this', means this instance of a view
//     return this;
//   },
//
//   // events hash connects DOM events to event handlers
//   events: {
//     // click on the button with a class of delete will execute the function deleteTask
//     'click button.delete': 'deleteTask',
//     'click button.toggle-complete': 'toggleCompletion',
//     'click button.edit': 'editTask',
//     'click': 'selectTask',
//   },
//   deleteTask(event) {
//     // .destroy - destroys the model and all the event listeners
//     this.model.destroy();
//     this.remove();
//   },
//   toggleCompletion(event) {
//     // this.$el.toggleClass('is-complete');
//     this.model.toggleComplete();
//   },
//   editTask(event) {
//     // console.log('Editing task');
//     // console.log(event);
//     // console.log(this);
//     // we want to use from from TaskListView and we need to make that big view to listen to this 'edit_me' message
//     this.trigger('edit_me', this.model);
//   },
//   selectTask(event) {
//     this.bus.trigger('selected_task', this.model);
//   },
// });
//
// export default TaskView;
