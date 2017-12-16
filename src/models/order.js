import Backbone from 'backbone';
import Quote from 'models/quote';

const Order = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    targetPrice: 0.00,
    buy: true,
    // quote: null
  },

  validate() {
    const targetPrice = this.get('targetPrice');
    const symbol = this.get('symbol');

    if (!targetPrice) {
      console.log("Order cannot be created without a price")
      return "Order cannot be created without a price";
    }

    // if (typeof targetPrice != 'float') {
    //   return "Order price must be a number";
    // }

    if (!symbol) {
      return "Please select a symbol";
    }
  }
});

export default Order;
