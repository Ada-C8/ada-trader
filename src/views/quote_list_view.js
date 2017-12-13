import Backbone from 'backbone';
import Quote from '../models/quote';
import QuoteView from './quote_view';

const QuoteListView = Backbone.View.extend({
  initialize(params) { // params is a hash -- only a hash because we passed it in as such
    this.template = params.template;

    this.listenTo(this.model, 'update', this.render);
  },
  // events: {
  //
  // },
  render() {
    this.$('#quotes').empty();

    this.model.each((quote) => {
      const quoteView = new QuoteView({
        model: quote,
        template: this.template,
        tagName: 'li',
        className: 'quote',
      });

      this.$('#quotes').append(quoteView.render().$el);
    });
    return this;
  },
});

export default QuoteListView;
