import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  // defaults: {
  //   symbol: 'undefined',
  //   targetPrice: 0.00,
  // },
  validate(attributes) {
    const errors = {};
    if (!attributes.symbol) {
      errors['symbol'] = ['symbol cannot be blank'];
    }
    if (!attributes.targetPrice) {
      errors['price-target'] = ['price-target cannot be blank'];
    }
    if (attributes.targetPrice <= 0) {
      errors['price-target'] = ['price-target cannot be blank or less than 1'];
    }
    // buy is true: if $ > than matchedQuote
    if (attributes.buy) {
      if (attributes.targetPrice > attributes.matchedQuote.get('price'))  {
         errors['price-target'] = ['buy price cannot be above market value'];
       }
    }

    // sell: if $ < matchedQuote
    if (!attributes.buy) {
      if (attributes.targetPrice < attributes.matchedQuote.get('price'))  {
         errors['price-target'] = ['sell price cannot be below market value'];
       }
    }
    if (Object.keys(errors).length > 0) {
      return errors;
    } else {
      return false;
    }
  },
  comparePrice() {
    // buy open orders at equal or below quote price
    if (this.attributes.buy) {
      if (this.attributes.targetPrice <= this.attributes.matchedQuote.get('price')) {
        // alert('open buy order has been met');
        
      }
    }
    //sell open orders at equal or above quote price
    if (!this.attributes.buy) {
      if (this.attributes.targetPrice >= this.attributes.matchedQuote.get('price'))
        // alert('open sell order has been met');

      }
    }
});

export default Order;
