import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'change', this.render);
  },
  render() {
    const compileTemplate = this.template(this.model.toJSON());
    this.$el.html(compileTemplate);

    return this;
  },
  events: {
    // 'click button.delete': 'deleteTask',
    // 'click button.toggle-complete': 'toggleTask'
  },

});

export default QuoteView;
