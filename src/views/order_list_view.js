import Backbone from 'backbone';
import Order from 'models/order';
import OrderView from 'views/order_view';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.bus = params.bus;
    this.listenTo(this.bus, 'create_orders', this.render);
  },
  render(current_quotes) {
    console.log(current_quotes.length);
    current_quotes.each((quote) => {
      const order = new Order({
        symbol: quote.get('symbol'),
        price: quote.get('price'),
      });
      this.$el.append(`<option value="${order.get('symbol')}">${order.get('symbol')}</option`);
    });
  },
});

export default OrderListView;
