import Backbone from 'backbone';
import Order from '../models/order';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.bus = params.bus;
    this.template = params.template;
    this.triggered = false;

    const eventName = `${this.model.get('symbol').toLowerCase()}_change`;
    this.listenTo(this.bus, eventName, this.checkPrice, this.model);
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());

    this.$el.html(compiledTemplate);

    return this;
  },
  events: {
    'click button.btn-cancel': 'cancelOrder',
  },
  cancelOrder(quote) {
    this.model.destroy(
      {success: function() {
        console.log("order has been cancelled");
      }}
    );
    this.remove();
  },
  executeOrder(quote, buy) {
    console.log(`${buy ? 'buy!' : 'sell!'}`);
    this.remove();
    this.model.destroy({
      success: function(response) {
        if (buy) {
          quote.buy();
        } else {
          quote.sell();
        }
        console.log("model has been destroyed");
      },
    });
  },
  checkPrice(quote) {
    const quotePrice = quote.model.get('price');
    const targetPrice = this.model.get('targetPrice');
    if (this.model.get('buy') && (quotePrice <= targetPrice) && !this.model.get('triggered')) {
      // ⬇ what is a better way of stopping it from re-triggering itself before it completes??
      if (!this.model.get('triggered')) {
        this.model.set('triggered', true);
        // console.log(`target price is ${targetPrice}, current price is ${quotePrice}. buying`);
        this.executeOrder(quote, true);
      }
    } else if (!this.model.get('buy') && (quotePrice >= targetPrice)) {
      console.log(this.model.get('triggered'));
      if (!this.model.get('triggered')) {
        this.model.set('triggered', true);
        // console.log(`target price is ${targetPrice}, current price is ${quotePrice}. buying`);
        this.executeOrder(quote, false);
      }
    }
  },
});

export default OrderView;
