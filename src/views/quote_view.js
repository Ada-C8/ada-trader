import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  // params is an object. it contains a template. We're going to assign that tempalte to the new view we are creating.
  initialize(params) {
    this.template = params.template;
    // good practice to have this in every view
    this.listenTo(this.model, "change", this.render);
  },
  //similar to how we used our underscore templates. It is going to take the template we created on initialize and a model and make a compiled template.
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    if (this.model.get('is_complete')) {
      this.$el.addClass('is-complete');
    } else {
      this.$el.removeClass('is-complete');
    }
    return this;
  },

});

export default QuoteView;
