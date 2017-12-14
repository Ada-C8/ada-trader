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
    this.listenTo(this.bus, 'quote_price_change', this.buySellQuote);
  },
  render() {
      this.$('#orders').empty();

      this.model.each((order) => {
        const orderView = new OrderView({
          model: order,
          template: this.template,
          tagName: 'li',
          className: 'order', // orders?
          bus: this.bus,
        });
        this.$('#orders').append(orderView.render().$el);
      });
      this.newOrderFormRender();
      return this;
    },
    events: {
      'click button.buy': 'buy',
      'click button.sell': 'sell',
    },
    buy(event) {
      console.log('buying');
      this.model.buy();
      this.bus.trigger('update', this.model);
    },
    sell(event) {
      console.log('selling');
      this.model.sell();
      this.bus.trigger('update', this.model);
    },
});

export default OrderListView;
