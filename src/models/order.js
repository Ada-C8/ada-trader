import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    priceTarget: 0.00,
    buy: null,
    quote: null,
  },
});

export default Order;
