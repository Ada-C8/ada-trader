import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
  },
  render() {
    // TODO: confirm that .toJSON() is necessary
    // console.log(this.template);
    const compiledTemplate = this.template(this.model.toJSON());

    this.$el.html(compiledTemplate);

    return this;
  },
});

export default QuoteView;
