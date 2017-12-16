import Backbone from 'backbone';
// import Order from '../models/order';
// import _ from 'underscore';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.quote = this.model.get('quote');
    this.listenTo(this.quote, 'change', this.checkForTrade);
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  events: {
    'click .btn-cancel': 'cancelOrder',
  },
  checkForTrade() {
    // Better to trigger a cancelOrder from here or from the quoteview??
    if (this.model.shouldTrade() == 'buy') {
      this.bus.trigger('buyOrder', this);
    } else if (this.model.shouldTrade() == 'sell') {
      this.bus.trigger('sellOrder', this);
    } 
  },
  cancelOrder() {
    this.bus.trigger('removeOrder', this);
  }
})

export default OrderView;
