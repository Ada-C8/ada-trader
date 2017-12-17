import Backbone from 'backbone';
import OrderView from '../views/order_view';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.quoteTemplate = params.quoteTemplate
    this.bus = params.bus;
    this.listenTo(this.model, 'update', this.render);
    this.model = params.model;
    this.listenTo(this.bus, 'changeQuote', (quote) => {
      this.checkLimitOrder(quote)
    });
  },
  render() {
    this.$('#orders').empty();
    this.model.each((order) => {
      const orderView = new OrderView({
        model: order,
        template: this.template,
        tagName: 'li',
        className: 'order',
        bus: this.bus,
      });
      this.$('#orders').append(orderView.render().$el);
    });
    return this;
  },
  checkLimitOrder(quote) {
    if (this.model.models.length > 0) {
      let length = this.model.models.length;
      for (let i = 0; i < length ; i += 1) {
        const buy = this.model.models[i].attributes.buy;
        const trigger = buy ? 'boughtLimitOrder' : 'soldLimitOrder';
        this.trade(quote, i, trigger, buy);
      }
    }
  },
  trade(quote, i, trigger, buy) {
    const targetPrice = this.model.models[i].attributes.targetPrice;
    const symbol = this.model.models[i].attributes.symbol;
    const quoteSymbol = quote.attributes.symbol;
    const currentPrice = quote.attributes.price;
    const trade = buy ? currentPrice <= targetPrice : currentPrice >= targetPrice;
    if (quoteSymbol == symbol && trade) {
      this.bus.trigger(trigger, this.model.models[i]);
      this.bus.trigger('eraseQuote', this);
    }
  }
});

export default OrderListView;
