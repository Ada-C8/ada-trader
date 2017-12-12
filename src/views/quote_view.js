import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'change', this.render);
  },

  events: {
    'click .btn-buy': 'buyQuote',
    'click .btn-sell': 'sellQuote',
  },

  buyQuote(event) {
    // Call the quote model method
    this.model.buy();
    this.trigger('add_quote', this.model);
  },

  sellQuote(event) {
    this.model.sell();
  },

  render() {
    // JSON to make the view into the proper object format
    const compiledTemplate = this.template(this.model.toJSON());

    // Selects the li element that was defined when the QuoteView was created
    // el is where all the event binding takes place
    // $el returns a jquery object that can be modified using jquery methods
    // Renders the li and then appends it to the page
    this.$el.html(compiledTemplate);
    return this;
  },
});

export default QuoteView;
