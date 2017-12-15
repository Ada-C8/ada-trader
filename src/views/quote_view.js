import Backbone from 'backbone';
import $ from 'jquery';

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

    this.model.buy();
    this.addTrade();
  },

  sellQuote() {
    console.log('sell triggered');

    this.model.sell();
    this.addTrade();
  },

  checkOrders() {
    const sym = this.model.get('symbol');
    this.bus.trigger(`check${sym}`, this.model);
  },

  addTrade() {
    console.log('adding trade to template');
    const tradeTemplate = this.tradeTemplate(this.model.toJSON());
    $('#trades').prepend(tradeTemplate);
  },
});

export default QuoteView;
