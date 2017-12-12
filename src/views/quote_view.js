import Backbone from 'backbone';
// import Task from '../models/task';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;

    // Listen to changes in the model and call render when they occur.
    this.listenTo(this.model, 'change', this.render);
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    // if (this.model.get('is_complete')) {
    //   this.$el.addClass('is-complete')
    // } else {
    //   this.$el.removeClass('is-complete')
    // }
    return this;
  },
  // events: {
  //   'click button.delete': 'deleteQuote',
  //   'click .toggle-complete': 'toggleComplete',
  // },
  // deleteQuote: function() {
  //   this.model.destroy();
  //   this.remove();
  // },
  // toggleComplete: function() {
  //   this.model.set('is_complete', !this.model.get('is_complete'));
  //   // this.$el.toggleClass('is-complete');
  // }
});

export default QuoteView;
