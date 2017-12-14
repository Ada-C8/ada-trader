import Backbone from 'backbone';
import QuoteView from '../views/quote_view'

import Quote from '../models/quote';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'update', this.render);
    // when quotes change execute currentQuoteList function which will trigger an event on the bus that will pass the current quotelist to
    this.bus = params.bus;
    this.listenTo(this.bus, 'quote_change', this.currentQuoteList);

  },
  render() {
    this.$('#quotes').empty();
    console.log('in quotelistview render');
    console.log(this.model)
    this.model.each((quote) => {
      const quoteView = new QuoteView({
        model: quote,
        template: this.template,
        tagName: 'li',
        // TODO: check for styling
        className: 'quote',
        bus: this.bus,
      });
      // console.log('the quotelist');
      // console.log(this.model);
      console.log('in quotelistview render after quote models loop');
      this.$('#quotes').append(quoteView.render().$el);
      console.log('after quoteview is appended');

    });
    //TODO: check passing
    // let quotes = this.model;
    // console.log(quotes);
    console.log('symbols array')
    console.log(this.model.symbols());
    let quotes = this.model.symbols();
    this.bus.trigger('quote_symbols', quotes);
    return this;
  },
  //currentQuoteList triggers an updated_quote_list event which the openOrderListView will listen for
  currentQuoteList() {
    console.log('in currentQuoteList');
    console.log(this.model);
    let quoteList = this.model
    this.bus.trigger('updated_quote_list',quoteList);
  },
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
