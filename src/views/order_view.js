import Backbone from 'backbone';
import Order from '../models/order';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.bus = params.bus;
    this.template = params.template;

    const eventName = `${this.model.get('symbol').toLowerCase()}_change`;
    this.listenTo(this.bus, eventName, this.checkPrice, this.model);
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());

    this.$el.html(compiledTemplate);

    return this;
  },
  events: {
    'click button.btn-cancel': 'removeOrder',
  },
  removeOrder() {
    this.model.destroy();
    this.remove();
  },
  checkPrice(quote) {
    const quotePrice = quote.model.get('price');
    const targetPrice = this.model.get('targetPrice');
    if (this.model.get('buy') && (quotePrice <= targetPrice)) {
      console.log(`target price is ${targetPrice}, current price is ${quotePrice}. BUYING!`);
      this.removeOrder();
      quote.buy();
      return;
    } else if (!this.model.get('buy') && (quotePrice >= targetPrice)) {
      console.log(`target price is ${targetPrice}, current price is ${quotePrice}. SELLING!`);
      this.removeOrder();
      quote.sell();
      return;
    }
  },
});

export default OrderView;
