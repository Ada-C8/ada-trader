import Backbone from 'backbone';
import Order from 'models/order';
import OrderView from 'views/order_view';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.bus = params.bus;
    this.template = params.template;
    // SEE QUOTE_LIST_VIEW RENDER() FOR THE TRIGGER
    this.listenTo(this.bus, 'append_symbols', this.render);
  },

  render(quote_symbols) {
    quote_symbols.each((quote) => {
      this.$el.append(`<option value="${quote.get('symbol')}">${quote.get('symbol')}</option>`);
    });
  },
});

export default OrderListView;
