import Backbone from 'backbone';
import _ from 'underscore';

import QuoteList from '../collections/quote_list';


const Order = Backbone.Model.extend({
  validate(attributes) {
    const errors = {};
    // let wantQuote;
    // function matchingQuote(quote) {
    //   return quote.symbol === attributes.symbol;
    // };

    if (!attributes.symbol) {
      errors['symbol'] = ["Quote symbol is required"];
    }

    if (attributes.buy) {
      let wantQuote = this.attributes.quotes.models.filter(quote => (quote.attributes.symbol === attributes.symbol));

      // this.attributes.quotes.models.forEach(function (model){
      //   if (model.attributes.symbol === attributes.symbol) {
      //     console.log(model);
      //     wantQuote = model;
      //   }
      // });

      console.log(wantQuote[0].attributes.price);
      console.log(attributes.targetPrice)
      // console.log(wantQuote.price);
      // console.log(attributes.targetPrice);


      if (attributes.targetPrice >= wantQuote[0].attributes.price) {
        errors['targetPrice'] = ["Traget price is higher than current market cost."];
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
