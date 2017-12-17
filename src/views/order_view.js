import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.order = params.model;
    this.quote = this.order.attributes.quote[0];
    this.listenTo(this.quote, 'change', this.executeTrade);
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  events: {
    'click button.btn-cancel': 'cancelOrder',
  },
  executeTrade() {
    const quotePrice = this.quote.get('price');
    const target = this.order.get('priceTarget');
    const isBuy = this.order.get('buy');
    if (quotePrice >= target && !isBuy) {
      this.stopListening().remove();
      this.quote.sell();
      this.order.destroy();
    } else if (quotePrice <= target && isBuy) {
      this.stopListening().remove();
      this.quote.buy();
      this.order.destroy();
    }
  },
  cancelOrder() {
    this.stopListening().remove();
    this.order.destroy();
  },
});

export default OrderView;
