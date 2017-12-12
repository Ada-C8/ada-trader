import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    // use $el to ensure that we only select items within the view
    this.$el.html(compiledTemplate);
    return this;
  },
});

export default QuoteView;
