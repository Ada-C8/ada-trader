import Backbone from 'backbone';

const OpenOrder = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00,
  },

});

export default OpenOrder;
