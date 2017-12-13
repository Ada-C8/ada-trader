//form will get rendered always
// the bigger scope- captures the whole bottom part- the form AND the individual orders that will show up once the orders are created
//
import Backbone from 'backbone';
// import _ from 'underscore';
import QuoteView from '../views/quote_view';
import Quote from '../models/quote';
import TradeHistoryView from '../views/trade_history_view';
import OrderView from '../views/order_view';

const OrderListView = Backbone.View.extend({
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

export default OrderListView;
