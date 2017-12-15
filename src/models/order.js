import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  default: {
    symbol: 'UNDEF',
    setPrice: 0.00,
    actualPrice: 0.00
  },

  initalize(params) {

  }

  validate() {
    
  }

});

export default Order;
