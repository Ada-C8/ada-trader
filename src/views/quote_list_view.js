import Backbone from 'backbone';
import _ from 'underscore';
import Quote from 'models/quote';
import QuoteList from 'collections/quote_list';
import QuoteView from 'views/quote_view';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'update', this.render);
  },
  render() {
    this.$('#quotes').empty();

    this.model.each((quote) => {
      console.log(`rendering ${quote}`);
      const quoteView = new QuoteView({
        model: quote,
        template: this.template,
        className: 'quote',
      });
      this.$('#quotes').append(quoteView.render().$el);
    });

    return this;
  },

});

export default QuoteListView;
