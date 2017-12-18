import Backbone from 'backbone';
import Quote from '../models/quote';
import QuoteView from '../views/quote_view';
import TradeHistoryView from '../views/trade_history_view';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.tradeTemplate = params.tradeTemplate;
    console.log(params);

    this.listenTo(this.model, 'update', this.render)
  },

  render() {
    const tradeHistoryView = new TradeHistoryView( {
      bus: this.bus,
      el: '#trades',
      template: this.tradeTemplate,
    });
    this.$el.empty();
    console.log(this);
    this.model.each((quote)=> {
      const quoteView = new QuoteView({
        model: quote,
        template: this.template,
        tagName: 'li',
        className: 'quotes',
        bus: this.bus,
      });

      this.$el.append(quoteView.render().$el);
    });
    console.log('render tradeHistoryView')

    return this;
    //always return this
  },
});

export default QuoteListView;
