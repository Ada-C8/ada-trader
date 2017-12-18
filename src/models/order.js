import Backbone from 'backbone';


const Order = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    targetPrice: 0.00,
    buy: true,
  },

});

export default Order;
