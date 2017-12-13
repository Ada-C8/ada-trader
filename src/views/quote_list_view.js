import Backbone from 'backbone';
import QuoteView from '../views/quote_view';
import Quote from '../models/quote';

const QuoteListView = Backbone.View.extend ({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'update', this.render);
  },

  render() {
    this.model.each((quote) => {
      const quoteView = new QuoteView({
        model: quote,
        template: this.template,
        tagName: 'li',
        className: 'quote',
      });
      //middle man in passing buy or sell event
      this.listenTo(quoteView, 'add_trade', this.addTrade);

      this.$('#quotes').append(quoteView.render().$el);
    });
    return this;
  },

  addTrade() {
    console.log('passing new trade to trades view');
    this.trigger('add_trade', this.model);
  }


});

export default QuoteListView;
