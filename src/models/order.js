import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  initialize(attributes) {
    //raise an error if you didn't get a quote
  },
  validate(attributes) {
    const errors = {};

    if (!attributes.symbol) {
      errors['symbol'] = ['Symbol is required'];
    }

    if (!attributes.targetPrice) {
      errors['price-target'] = ['Invalid target price'];
    }

    if (attributes.targetPrice <= 0) {
      errors['price-target'] = ['Invalid target price'];
    }

    //Don't BUY: if order's target price is greater than quote's price
    if (attributes.buy && (attributes.targetPrice > attributes.matchedQuote.get('price')) ) {
      errors['price-target'] = ['Price higher than market price!'];
    }

    //Don't SELL: if order's target price is less than quote's price
    if (!attributes.buy && (attributes.targetPrice < attributes.matchedQuote.get('price')) ) {
      errors['price-target'] = ['Price lower than market price!'];
    }

    if ( Object.keys(errors).length > 0 ) {
      return errors;
    } else {
      return false;
    }
  },
  priceCheck() {
    //BUY: if order's target price is equal to or below quote's price
    if (this.attributes.buy && (this.attributes.targetPrice >= this.attributes.matchedQuote.get('price')) ) {
      // alert('hey buy!');
      const matchedQuoteCopy = this.attributes.matchedQuote;
      // debugger;
      this.destroy();
      matchedQuoteCopy.buy();
    }

    //SELL: if order's target price is equal to or above quote's price
    if (!this.attributes.buy && (this.attributes.targetPrice <= this.attributes.matchedQuote.get('price')) ) {
      // alert('hey sell!');
      const matchedQuoteCopy = this.attributes.matchedQuote;
      // debugger;
      this.destroy();
      matchedQuoteCopy.sell();
    }
  },

});

export default Order;
