import Backbone from 'backbone';
import _ from 'underscore';
import QuoteView from '../views/quote_view';
import Quote from '../models/quote';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'update', this.render);
  },
  render() {
    // Clear the unordered list
    // this.$('#quotes').empty();
    // Iterate through the list rendering each Quote
    this.model.each((quote) => {
      // Create a new QuoteView with the model & template
      const quoteView = new QuoteView({
        model: quote,
        template: this.template,
        tagName: 'li',
        className: 'workspace',
      });
      // Then render the TaskView
      // And append the resulting HTML to the DOM.
      this.$('#quotes').append(quoteView.render().$el);
    });
    return this;
  },
  // events: {
  //   'click #add-new-task': 'addTask'
  // },
  // addTask: function(event) {
  //   event.preventDefault();
  //   const taskData ={};
  //   ['task_name', 'assignee'].forEach( (field) => {
  //     const val = this.$(`#add-task-form input[name=${field}]`).val();
  //     if (val != '') {
  //       taskData[field] = val;
  //     }
  //   });
  //   const newTask = new Task(taskData);
  //   if (newTask.isValid()) {
  //     this.model.add(newTask);
  //     this.updateStatusMessageWith(`New task added: ${newTask.get('task_name')}`);
  //   } else {
  //     this.updateStatusMessageFrom(newTask.validationError);
  //   }
});


export default QuoteListView;
