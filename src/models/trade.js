import Backbone from 'backbone';

const Trade = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00,
    transaction: 'buy',
  },

});

export default Trade;
