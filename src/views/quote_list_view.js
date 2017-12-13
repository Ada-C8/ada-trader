import Backbone from 'backbone';
// import _ from 'underscore';
import QuoteView from '../views/quote_view';
import Quote from '../models/quote';
import TradeHistoryView from '../views/trade_history_view';

const QuoteListView = Backbone.View.extend({
  initialize(params){
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'update', this.render);
  },
  render() {
      this.$('#quotes').empty();

      this.model.each((quote) => {
        const quoteView = new QuoteView({
          model: quote,
          template: this.template,
          tagName: 'li',
          className: 'quote',
          bus: this.bus,
        });
        this.$('#quotes').append(quoteView.render().$el);
      });
      return this;
    },
});

export default QuoteListView;
