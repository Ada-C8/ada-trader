import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  initialize(params) {
    this.currentPrice = params.currentPrice,
    this.buy = params.buy
  },

  validate(attributes) {
    const errors = {};
    if (!attributes.targetPrice) {
      errors.targetPrice = ['can\'t be blank'];
    }
    else if (buy && targetPrice >= this.currentPrice) {
      errors.targetPrice = ['can\'t be grater than or equal to the current market price'];
    }
    else if (!buy && targetPrice <= this.currentPrice) {
      errors.targetPrice = ['can\'t be less than or equal to the current market price'];
    }

    if (Object.keys(errors).length < 1) {
      return false;
    }
    return errors;
  },

  // buy() {
  //   this.set('price', this.get('price') + 1.00);
  // },

});

export default Order;
