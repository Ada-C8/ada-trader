import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, "change", this.render);
  },

// This is the portion of the code, that needs to be listening to the buttons for click events, as it is rendering the buttons on the page.
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);

    return this;
  },

  events: {
    'click button.btn-buy': 'buyQuote',
    'click button.btn-sell': 'sellQuote',

  },
  buyQuote: function() {
    this.model.buy();
  },

  sellQuote: function() {
    this.model.sell();
  },

});

export default QuoteView;
