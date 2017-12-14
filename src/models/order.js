import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  validate(attributes) {
    let errors;
    if (!attributes.targetPrice) {
      errors = 'A target price is required.';
      // because the form type is number, I don't need to validate numericality
    }

    const quotePrice = this.get('quote').get('price');
    const invalidBuy = this.get('buy') && (quotePrice <= this.get('targetPrice'))
    const invalidSell = !this.get('buy') && (quotePrice >= this.get('targetPrice'))

    if (invalidBuy || invalidSell) {
      errors = `to set a ${invalidBuy ? 'buy' : 'sell'} order, targetPrice must be ${invalidBuy ? 'lower' : 'higher'} than current price`; //is this the right place to be doing this validation?
    }

    if ( errors ) {
      return errors;
    } else {
      return false;
    }
  },
});

export default Order;
