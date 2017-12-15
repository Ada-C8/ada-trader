import Backbone from 'backbone';
import $ from 'jquery';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'change', this.render);

    this.tradeTemplate = params.tradeTemplate;

    this.listenTo(this.model, 'printMe', this.addTemplate);
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
  },
  sellQuote: function() {
    this.model.sell();
  },
  addTemplate() {
    $('#trades').prepend(this.tradeTemplate(this.model.toJSON()));
  },
});

export default QuoteView;
