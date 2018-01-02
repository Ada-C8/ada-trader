import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  validate: function(attributes) {
    const errors = {};
    if (!attributes.targetPrice) {
      errors['Price'] = ['cannot be blank'];
    } else if (isNaN(attributes.targetPrice)) {
      errors['Price'] = ['must be a number - leave off $'];
    } else if (attributes.targetPrice <= 0){
      errors['Price'] = ['must be greater than 0']
    } else if (attributes.buy && attributes.targetPrice > attributes.marketPrice) {
      errors['Price'] = ['cannot be higher than market price for buy orders'];
    } else if (!attributes.buy && attributes.targetPrice < attributes.marketPrice) {
      errors['Price'] = ['cannot be lower than market price for sell orders'];
    } else if (!attributes.symbol) {
      errors['Symbol'] = ['cannot be blank'];
    }
    if (Object.keys(errors).length > 0) {
      return errors;
    } else {
      return false;
    }
  },
  executeOrder: function(changeInfo) {
    if (this.get('symbol') === changeInfo.symbol && this.get('buy') === true && changeInfo.currentPrice <= this.get('targetPrice')) {
      this.trigger('buy', changeInfo);
    }
    if (this.get('symbol') === changeInfo.symbol && this.get('buy') === false && changeInfo.currentPrice >= this.get('targetPrice')) {
      this.trigger('sell', changeInfo);
    }
  }
});

export default Order;
