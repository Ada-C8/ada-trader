import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  validate: function(attributes) {
    let error = '';

    if (attributes.buy && (attributes.targetPrice > attributes.quote[0]['attributes']['price'])) {
      error = 'Price higher than market price!';
      console.log(error);
    } else if (!attributes.buy && (attributes.targetPrice < attributes.quote[0]['attributes']['price'])) {
      error = 'Price lower than market price!';
      console.log(error);
    } else if (isNaN(attributes.targetPrice)) {
      error = 'Invalid Target Price';
    }

    if (error != '') {
      return error
    } else {
      return false
    }
  }
});

export default Order;
