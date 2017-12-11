import Backbone from 'backbone';
import _ from 'underscore';
import QuoteView from '../views/quote_view';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
});

export default QuoteView
