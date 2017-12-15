import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  validate: function(attributes) {
    const errors = {};
    if (!attributes.targetPrice) {
      errors['Price'] = ['cannot be blank'];
    } else if (isNaN(attributes.targetPrice)) {
      errors['Price'] = ['must be a number - leave off $']
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
      this.destroy();
    }
    if (this.get('symbol') === changeInfo.symbol && this.get('buy') === false && changeInfo.currentPrice >= this.get('targetPrice')) {
      this.trigger('sell', changeInfo);
      this.destroy();
    }
  }
});

export default Order;
