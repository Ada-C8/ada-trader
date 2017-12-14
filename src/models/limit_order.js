import Backbone from 'backbone';

const LimitOrder = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00,
    buy: true,
  }
});
export default LimitOrder
