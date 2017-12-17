import Backbone from 'backbone';
import OrderView from '../views/order_view';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'update', this.render);
    this.model = params.model;
    this.listenTo(this.bus, 'changeQuote', (quote) => {
      this.checkLimitOrder(quote)
    });
  },
  render() {
    this.$('#orders').empty();
    // console.log(this);
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
        let targetPrice = this.model.models[i].attributes.targetPrice;
        let symbol = this.model.models[i].attributes.symbol;
        let quoteSymbol = quote.attributes.symbol;
        let currentPrice = quote.attributes.price;
        if (quoteSymbol == symbol && currentPrice <= targetPrice) {
          const quoteView = new QuoteView({
            model: quote,
            bus: this.bus,
            template: this.template,
            tagName: 'li',
            className: 'quote',
          });
          this.bus.trigger('eraseQuote', this);
        }
      }
    }
  },
});

export default OrderListView;
