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
      this.checkIfTargetPrice(quote)
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
  checkIfTargetPrice(quote) {
    if (this.model.models.length > 0) {
      let length = this.model.models.length;
      for (let i = 0; i < length ; i += 1) {
        const buy = this.model.models[i].attributes.buy;
        const trigger = buy ? 'boughtLimitOrder' : 'soldLimitOrder';
        const orderModel = this.model.models[i];
        orderModel.trade(quote, i, trigger, buy);
      }
    }
  },
});

export default OrderListView;
