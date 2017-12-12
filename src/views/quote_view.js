import Backbone from 'backbone';
import Quote from '../models/quote';

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
  events: {
    'click button.btn-buy': function() {this.model.buy();},
    'click .btn-sell': function() {this.model.sell();},
  },
});

export default QuoteView;
