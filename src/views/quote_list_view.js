import Backbone from 'backbone';
import QuoteView from './quote_view';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'update', this.render);
  },

  render() {
    const list = this.$('#quotes');
    list.empty();
    this.model.each((quote) => {
      const quoteView = new QuoteView({
        model: quote,
        template: this.template,
        tagName: 'li',
        className: 'quote',
        bus: this.bus,
      });
      list.append(quoteView.render().$el);
    });
    return this;
  },
});

export default QuoteListView;
