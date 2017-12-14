import Backbone from 'backbone';
import $ from 'jquery';

import QuoteView from '../views/quote_view';


const Order = Backbone.Model.extend({
  defaults: {
    symbol: '',
    targetPrice: '',
    buy: '',
  },
  initialize(attributes) {
    // console.log(attributes.activeQuote);
    // console.log(attributes.buy);
    console.log(attributes);
    this.buy = attributes.buy;
    this.targetPrice = attributes.targetPrice
    this.quote = attributes.activeQuote;
    this.listenTo(this.quote, 'change', this.quoteCheck);
    this.bus = attributes.bus;
  },
  validate(attributes) {
    const errors = {};

    console.log(attributes);

      if (!attributes.targetPrice) {
        errors['targetPrice'] = ['Price is required'];
      }

      if (attributes.targetPrice <= 0) {
        errors['targetPrice'] = ['Price must be greater than 0']
      }

      if (attributes.buy === true && parseFloat(attributes.targetPrice) > parseFloat(attributes.activeQuote.get('price'))) {
        errors['targetPrice'] = ['Buy order price too high']
      }

      if (attributes.buy === false && parseFloat(attributes.targetPrice) < parseFloat(attributes.activeQuote.get('price'))) {
        errors['targetPrice'] = ['Sell order price too low']
      }
      if ( Object.keys(errors).length > 0 ) {
        return errors;
      } else {
        return false;
      }
  },
  quoteCheck: function(e) {
    console.log('IN executeQuote');
    console.log(parseFloat(this.targetPrice));
    console.log(parseFloat(this.quote.get('price')));
      console.log(this.bus);
      if (this.buy && parseFloat(this.targetPrice) > parseFloat(this.quote.get('price'))) {
        console.log('IN BUY executeQuote');
        console.log(this.quote.attributes);
        this.bus.trigger(`buyMe${this.quote.attributes.symbol}`, this.quote.attributes);
        console.log(this.bus);

      } else if (!this.buy && parseFloat(this.targetPrice) < parseFloat(this.quote.get('price'))) {
          console.log('IN SELL ')
          console.log(this.bus);
          this.bus.trigger(`sellMe${this.quote.attributes.symbol}`, this.quote.attributes);

      }
    },
});

export default Order;
