import Backbone from 'backbone';
import Quote from 'models/quote';

const Order = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    targetPrice: 0.00,
    buy: true,
    // quote: null
  }

});

export default Order;
