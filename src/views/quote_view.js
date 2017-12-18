import Backbone from 'backbone';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.bus, 'buyOrder', this.buyOrder);
    this.listenTo(this.bus, 'sellOrder', this.sellOrder);
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
  buyQuote: function(event) {
    this.model.set('buy', true);
    this.trigger('quoteAction', this);
    this.model.buy();
  },
  sellQuote: function(event) {
    this.model.set('buy', false);
    this.trigger('quoteAction', this);
    this.model.sell();
  },
  buyOrder: function(orderQuote) {
    if(orderQuote.model.get('symbol') === this.model.get('symbol')){
      this.buyQuote();
    }
  },
  sellOrder: function(orderQuote) {
    if(orderQuote.model.get('symbol') === this.model.get('symbol')){
      this.sellQuote();
    }
  }
});

export default QuoteView;
