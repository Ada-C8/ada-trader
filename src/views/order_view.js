import Backbone from 'backbone';
import Order from '../models/order';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.orderTemplate;
    this.bus = params.bus;
    this.listenTo(this.bus, `check${this.model.get('symbol')}`, this.checkQuote);
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  events: {
    'click button.btn-cancel': 'cancelOrder',
  },
  checkQuote: function(quote) {
    if (this.model.get('buy') && quote.get('price') < this.model.get('targetPrice')) {
      quote.buy();
      this.cancelOrder();
    }

    if (!this.model.get('buy') && quote.get('price') > this.model.get('targetPrice')) {
      quote.sell();
      this.cancelOrder();
    }
  },
  cancelOrder: function(event) {
    this.model.destroy();
    this.remove();
  },
});

export default OrderView;
