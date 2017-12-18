import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.tradesTemplate = params.tradesTemplate;
    this.listenTo(this.model, "change", this.render);
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);

    return this;
  }, //end of render
  events: {
    'click button.alert': 'buyStock',
    'click button.success': 'sellStock',
  },
  buyStock: function(e) {
    this.model.buy();
    this.trigger('listTrades', this);
  },
  sellStock: function(e) {
    this.model.sell();
    this.trigger('listTrades', this);
  }
}); // end of QuoteView

export default QuoteView;
