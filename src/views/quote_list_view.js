// import _ from 'underscore';
import Backbone from 'backbone';
import Quote from '../models/quote';
import QuoteList from '../collections/quote_list';
import QuoteView from './quote_view';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.bus = params.bus;
    this.template = params.template;

    this.listenTo(this.model, 'change', this.render);
  },
  render() {
    const $quoteList = this.$('#quotes');
    $quoteList.empty();

    this.model.each((quote) => {
      const quoteView = new QuoteView({
        model: quote,
        tagName: 'li',
        className: 'quote',
        template: this.template,
        bus: this.bus,
      });
      $quoteList.append(quoteView.render().$el);
    });

    return this;
  },
});

export default QuoteListView;
