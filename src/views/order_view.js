import Backbone from 'backbone';
// import Order from '../models/order';
// import _ from 'underscore';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.quote = this.model.attributes.quote[0];
    this.listenTo(this.quote, 'change', this.checkPrice);
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  events: {
    'click .btn-cancel': 'cancelOrder',
  },
  checkPrice() {
    // Better to trigger a cancelOrder from here or from the quoteview??
    if (this.model.attributes.buy) {
      if (this.model.attributes.targetPrice >= this.quote.attributes.price) {
        this.bus.trigger('buyOrder', this);
      }
    } else {
      if (this.model.attributes.targetPrice <= this.quote.attributes.price) {
        this.bus.trigger('sellOrder', this);
      }
    }
  },
  cancelOrder() {
    this.bus.trigger('removeOrder', this);
  }
})

export default OrderView;
