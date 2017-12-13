import Backbone from 'backbone';
import QuoteView from '../views/quote_view'

import Quote from '../models/quote';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'update', this.render);
    this.bus = params.bus;
  },
  render() {
    this.$('#quotes').empty();
        console.log('in quotelistview render');
    this.model.each((quote) => {
      const quoteView = new QuoteView({
        model: quote,
        template: this.template,
        tagName: 'li',
        // TODO: check for styling
        className: 'quote',
        bus: this.bus,
      });
      console.log('in quotelistview render');
      this.$('#quotes').append(quoteView.render().$el);

    });
    return this;
  }
});
// const TaskListView = Backbone.View.extend({
//   initialize(params) {
//     this.template = params.template;
//     this.listenTo(this.model, 'update', this.render);
//   },
//   render() {
//     // Clear the unordered list
//     this.$('#todo-items').empty();
//     // Iterate through the list rendering each Task
//     this.model.each((task) => {
//       // Create a new TaskView with the model & template
//       const taskView = new TaskView({
//         model: task,
//         template: this.template,
//         tagName: 'li',
//         className: 'task',
//       });
//       // Then render the TaskView
//       // And append the resulting HTML to the DOM.
//       this.$('#todo-items').append(taskView.render().$el);
//     });
//     return this;
//   }
// });

export default QuoteListView;
