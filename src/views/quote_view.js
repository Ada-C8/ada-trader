import Backbone from 'backbone';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.tradeTemplate = params.tradeTemplate;
    this.bus = params.bus,

    // listen to changes in model and render
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'change', this.checkOrders);

    this.listenTo(this.bus, `buy${this.model.get('symbol')}`, this.buyQuote);
    this.listenTo(this.bus, `sell${this.model.get('symbol')}`, this.sellQuote);
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
  buyQuote() {
    console.log('buy triggered');
    console.log(this);

    this.model.buy();
    this.bus.trigger('addTrade', this.model);
  },
  sellQuote() {
    console.log('sell triggered');
    console.log(this);

    this.model.sell();
    this.bus.trigger('addTrade', this.model);
  },
  checkOrders() {
    const sym = this.model.get('symbol');
    this.bus.trigger(`check${sym}`, this.model);
  },
});

export default QuoteView;
