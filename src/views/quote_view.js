import Quote from "../models/quote";
import Backbone from 'backbone';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus
    this.listenTo(this.model, "change", this.render);
  },

  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },

  events: {
    'click button.btn-buy': 'buyQuote',
    'click button.btn-sell': 'sellQuote',
  },
  buyQuote(event) {
    this.model.buy();
    this.bus.trigger('bought_quote', this.model);
    this.render();
  },
  sellQuote(event) {
    this.model.sell();
    this.bus.trigger('sold_quote', this.model);
    this.render();
  },
})

export default QuoteView
