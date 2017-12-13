import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  validate: function(attributes) {
    const errors = {};
    if (!attributes.symbol) {
      errors['symbol'] = 'Symbol cannot be blank';
    }
  }
});

export default Order;
