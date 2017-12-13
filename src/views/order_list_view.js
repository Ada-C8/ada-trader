import Backbone from 'backbone';
import Order from 'models/order';
import OrderView from 'views/order_view';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.bus = params.bus;
    // SEE QUOTE_LIST_VIEW RENDER() FOR THE TRIGGER
    this.listenTo(this.bus, 'create_orders', this.render);
  },

  render(current_quotes) {
    current_quotes.each((quote) => {
      const order = new Order({
        symbol: quote.get('symbol'),
        price: quote.get('price'),
      });
      // Append this to the Order Entry form once the orders are created
      this.$el.append(`<option value="${order.get('symbol')}">${order.get('symbol')}</option`);
    });
    return this;
  },
});

export default OrderListView;
