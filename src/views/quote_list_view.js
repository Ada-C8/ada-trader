import Backbone from 'backbone';
import QuoteView from '../views/quote_view';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'update', this.render);
    this.quoteView = [];
  },
  render() {
    this.model.each((quote) => {
      const quoteView = new QuoteView({
        model: quote,
        template: this.template,
        className: 'quote',
      });
      this.quoteView.push(quoteView);
      this.listenTo(quoteView, 'quoteChanged', this.aChange);
      this.$('#quotes').append(quoteView.render().$el);
    });
    return this;
  },
  aChange() {
    this.trigger('quoteChanged', this);
  },
});

export default QuoteListView;
