import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  validate: function(attributes) {
    let error = '';

    if (attributes.buy && (attributes.targetPrice >= attributes.quote.get('price'))) {
      error = 'Price higher than market price!';
    } else if (!attributes.buy && (attributes.targetPrice <= attributes.quote.get('price'))) {
      error = 'Price lower than market price!';
    } else if (isNaN(attributes.targetPrice)) {
      error = 'Invalid Target Price';
    }

    if (error != '') {
      return error
    } else {
      return false
    }
  },
  shouldTrade() {
    const targetPrice = this.get('targetPrice');
    const quotePrice = this.get('quote').get('price');
    const buy = this.get('buy');

    if (buy && (targetPrice >= quotePrice)) {
      return 'buy'
    } else if (!buy && (targetPrice <= quotePrice)) {
      return 'sell'
    } else {
      return false
    }
  }
});

export default Order;
