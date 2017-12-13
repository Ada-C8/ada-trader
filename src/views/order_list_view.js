import Backbone from 'backbone';
import OrderView from 'views/order_view';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.bus = params.bus;
    this.listenTo(this.bus, 'create_orders', this.render);
  },
  render(current_quotes) {
    current_quotes.each((quote) => {
      const order = new Order({
        symbol: quote.symbol,
        price: quote.price,
      });
    });
  },
});

export default OrderListView;
