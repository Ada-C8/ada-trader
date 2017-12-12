import Backbone from 'backbone';
// import _ from 'underscore';
import QuoteView from '../views/quote_view';
import Quote from '../models/quote';

const QuoteListView = Backbone.View.extend({
  initialize(params){
    this.template = params.template;
    this.listenTo(this.model, 'update', this.render);
  },
  render() {
    // console.log('rendering listView');
      this.$('#quotes').empty();
      this.model.each((quote) => {
        // console.log(quote.get('symbol'));
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
