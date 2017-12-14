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
    const buy = this.model.get('buy');
    if (buy && (quotePrice <= targetPrice)) {
      // the 'triggered' attribute is a weird workaround - it takes
      // long enough between the event being triggered by the price change
      // and the model being deleted that, if the price stays within the range,
      // it can be triggered again by the next price change. As far as I
      // can tell, by changing the value of 'triggered' within this method,
      // it reacts quickly enough to prevent that double-fire.
      // What more elegant solutions could there be?
      if (!this.model.get('triggered')) {
        this.model.set('triggered', true);
        this.executeOrder(quote, true);
      }
    } else if (!buy && (quotePrice >= targetPrice)) {
      if (!this.model.get('triggered')) {
        this.model.set('triggered', true);
        this.executeOrder(quote, false);
      }
    }
  },
});

export default OrderView;
