import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'compareToMarketPrice', checkSubmittedOrderPrice);
  },

  events: {
    'click .btn-buy': 'buyQuote',
    'click .btn-sell': 'sellQuote',
  },

  buyQuote(event) {
    // Call the quote model method
    let currentTrade = {
      buy: true,
      symbol: this.model.get('symbol'),
      price: this.model.get('price'),
    };
    this.bus.trigger('add_quote', currentTrade);
    this.model.buy();
  },

  sellQuote(event) {
    let currentTrade = {
      buy: false,
      symbol: this.model.get('symbol'),
      price: this.model.get('price'),
    };
    this.bus.trigger('add_quote', currentTrade);
    this.model.sell();
  },

  render(event) {
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
