import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    targetPrice: 9.00,
    buy: true,
  },
  render() {

  },
})
export default Order
