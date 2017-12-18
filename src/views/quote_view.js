import Backbone from 'backbone';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'change', this.render);
    this.bus = params.bus;
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
  buyQuote: function() {
    this.model.buy();
    this.bus.trigger('boughtQuote', this);
  },
  sellQuote: function() {
    this.model.sell();
    this.bus.trigger('soldQuote', this);
  }
});

export default QuoteView;
