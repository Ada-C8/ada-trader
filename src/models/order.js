import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  defaults: {
    symbol: 'undefined',
    price: 0.00
  },
});

export default Order;
