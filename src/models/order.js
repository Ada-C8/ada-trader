import Backbone from 'backbone';
import _ from 'underscore';

import QuoteList from '../collections/quote_list';


const Order = Backbone.Model.extend({
  defaults: {
    targetPrice: 0.00
  },
  validate(attributes) {
    const errors = {};
    // let wantQuote;
    // function matchingQuote(quote) {
    //   return quote.symbol === attributes.symbol;
    // };
    let wantQuote = attributes.quotes.models.filter(quote => (quote.attributes.symbol === attributes.symbol));


    if (!attributes.symbol) {
      errors['symbol'] = ["Quote symbol is required"];
    }

    if (attributes.buy) {

      if (attributes.targetPrice >= wantQuote[0].attributes.price) {
        errors['targetPrice'] = ["Target price is higher than current market cost."];
      }
    }

    if (attributes.buy == false) {
      // let wantQuote = this.attributes.quotes.models.filter(quote => (quote.attributes.symbol === attributes.symbol));

      if (attributes.targetPrice <= wantQuote[0].attributes.price) {
        errors['targetPrice'] = ["Target price is less than current market cost."];
      }
    }

    if ( Object.keys(errors).length > 0 ) {
      console.log(errors);
      return errors;
    } else {
      return false;
    }
  },
});

export default Order;
