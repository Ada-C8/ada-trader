import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  initialize(params) {
    this.buy = params.buy;
    this.targetPrice = params.targetPrice;
    this.symbol = params.symbol;
  },

  validate(params) {
    const errors = {};
    if (!params.targetPrice) {
      errors['price'] = 'Invalid target price!';
    } //else if (params.buy && params.targetPrice >= params.quote.get('price') {

    

    if (Object.keys(errors).length > 0) {
      return errors;
    } else {
      return false;
    }
  },
});

export default Order;
