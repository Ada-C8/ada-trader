import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  // Params is an object. It contains a template. We're going to assign that template to the new view we are creating.
  initialize(params) {
    this.template = params.template;
    // good practice to have this in every view
    this.listenTo(this.model, "change", this.render);
  },
  // Similar to how we used our underscore templates. It is going to take the template we created on initialize and a model and make a compiled template.
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

  events: {
    // Event => click, select => button.delete (a button with class delete), function to call => deleteTask
    'click button.btn-buy': 'btn-buy',
    'click button.btn-sell': 'btn-sell',

  },
  // All callbakcs for events include an event. You don't have to use it, but it is there if you need it.
  buyQuote: function(e) {
    this.model.buy();
  },

  sellQuote: function(e) {
    this.model.sell();
  },

});

export default QuoteView;
