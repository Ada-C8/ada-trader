import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    targetPrice: 0.00
  },

  buyOrder(){
    this.set('buy', true);
  },
  sellOrder() {
      this.set('buy', false);
  },
});

export default Order;
