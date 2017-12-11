import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, "change", this.render);
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  // events: {
  //   'click button.delete': 'deleteTask',
  //   'click button.toggle-complete': 'toggleCompletionStatus'
  // },
  // deleteTask: function(event) {
  //   this.model.destroy();
  //   this.remove();
  // },
  // toggleCompletionStatus: function(event) {
  //   this.model.set('is-complete', !this.model.get('is_complete'));
  // },
});

export default QuoteView;
