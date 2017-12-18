import Backbone from 'backbone';
import QuoteList from 'collections/quote_list';

const Order = Backbone.Model.extend({
  defaults: {
    symbol: '',
    targetPrice: '',
    buy: '',
  },
  initialize(attributes) {
    this.buy = attributes.buy;
    this.targetPrice = attributes.targetPrice
    this.quote = attributes.activeQuote;
    this.symbolList = attributes.symbolList;
    this.listenTo(this.quote, 'change', this.quoteCheck);
    this.bus = attributes.bus;
  },
  validate(attributes) {
    const errors = {};

    if (!attributes.targetPrice) {
      errors['targetPrice'] = ['Price is cannot be blank'];
    }

    if (attributes.targetPrice <= 0) {
      errors['targetPrice'] = ['Price can not be a negative number']
    }

    if (!attributes.symbol) {
      errors['symbol'] = ['Symbol can not be blank'];
    }

    if (attributes.buy && parseFloat(attributes.targetPrice) >= parseFloat(attributes.activeQuote.get('price'))) {
      errors['targetPrice'] = ['Buy order price too high']
    }

    if (!attributes.buy && parseFloat(attributes.targetPrice) <= parseFloat(attributes.activeQuote.get('price'))) {
      errors['targetPrice'] = ['Sell order price too low']
    }

    if ( Object.keys(errors).length > 0 ) {
      return errors;
    } else {
      return false;
    }
  },

  quoteCheck: function(e) {
    if (this.buy && parseFloat(this.targetPrice) > parseFloat(this.quote.get('price'))) {
      this.bus.trigger(`buyMe${this.quote.attributes.symbol}`, this.quote.attributes);
    } else if (!this.buy && parseFloat(this.targetPrice) < parseFloat(this.quote.get('price'))) {
      this.bus.trigger(`sellMe${this.quote.attributes.symbol}`, this.quote.attributes);
    }
  },
});

export default Order;
