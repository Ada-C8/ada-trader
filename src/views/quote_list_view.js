import Backbone from 'backbone';
import _ from 'underscore';
import Quote from '../models/quote';
import QuoteView from '../views/quote_view';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'update', this.render);
  },
  render() {
    // Clear the unordered list
    this.$('#quotes').empty();
    // Iterate through the list rendering each Quote
    this.model.each((quote) => {
      // Create a new QuoteView with the model & template
      const quoteView = new QuoteView({
        model: quote,
        template: this.template,
        tagName: 'li',
        className: 'quote',
      });
      // Then render the QuoteView
      // And append the resulting HTML to the DOM.
      this.$('#quotes').append(quoteView.render().$el);
    });
    return this;
  },
  // events: {
  //   'click #add-new-quote': 'addQuote'
  // },
  // addQuote: function(event) {
  //   event.preventDefault();
  //
  //   const quoteData = {};
  //   ['quote_name', 'assignee'].forEach( (field) => {
  //     const val = this.$(`input[name=${field}]`).val();
  //     if (val != '') {
  //       quoteData[field] = val;
  //     }
  //   });
  //   const newQuote = new Quote(quoteData);
  //
  //   if (newQuote.isValid()) {
  //     this.model.add(newQuote);
  //     this.updateStatusMessageWith(`New quote added: ${newQuote.get('quote_name')}`);
  //   } else {
  //     this.updateStatusMessageFrom(newQuote.validationError);
  //   }
  // },
  // // helper method for updating the DOM with the status from a hash
  // updateStatusMessageFrom: function(messageHash){
  //   const statusMessagesEl = this.$('#status-messages');
  //   statusMessagesEl.empty();
  //
  //   _.each(messageHash, (messageType) => {
  //     messageType.forEach((message) => {
  //       statusMessagesEl.append(`<li>${message}</li>`);
  //     })
  //   });
  //   statusMessagesEl.show();
  // },
  // // helper method for updating the DOM with the status from a string
  // updateStatusMessageWith: function(message) {
  //   const statusMessagesEl = this.$('#status-messages');
  //   statusMessagesEl.empty();
  //   statusMessagesEl.append(`<li>${message}</li>`);
  //   statusMessagesEl.show();
  // }
});

export default QuoteListView;
