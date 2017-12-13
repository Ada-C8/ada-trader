import Backbone from 'backbone';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, "change", this.render);
  },
  render() {
    // why JSON?
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  events: {
    'click .btn-buy': 'buyQuote',
    'click .btn-sell': 'sellQuote',
  },
  buyQuote() {
    this.model.buy();
    console.log('bought!');
  },
  sellQuote() {
    this.model.sell();
    console.log('sold!');
  },
});

export default QuoteView;
