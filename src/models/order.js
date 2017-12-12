import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  defaults: {
    symbol: '',
    price: '',
    buy: '',
  },
  initialize(attributes) {
  },
  validate(attributes) {
  // add validations??
  },

});

export default Order;
