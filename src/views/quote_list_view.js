import Backbone from 'backbone';
import QuoteView from '../views/quote_view';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'update', this.render);
    this.bus = params.bus
  },
  render() {
    this.$('#quotes').empty();
    this.model.each((quote) => {
      const quoteView = new QuoteView({
        model: quote,
        bus: this.bus,
        template: this.template,
        tagName: 'li',
        className: 'quote',
      });
      this.listenTo(quoteView, 'buy', this.model.buy)
      this.$('#quotes').append(quoteView.render().$el);
    });
    return this;
  }
});

export default QuoteListView;
