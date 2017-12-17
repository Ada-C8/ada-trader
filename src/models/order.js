import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    targetPrice: 0.00,
    buy: true,
  },
  validate: function(attributes) {
    const errors = {};

    const legalQuotes = this.legalQuotes;

    let legalQuotesArray = [];
    for (let i = 0; i < legalQuotes.length; i += 1) {

      legalQuotesArray.push(legalQuotes[i].attributes.symbol)
    }

    if (!(legalQuotesArray.includes(attributes.symbol))) {
      errors['symbol'] = ['Invalid symbol'];
    }

    if (typeof(attributes.buy) != "boolean") {
      errors['buy'] = ['Invalid buy value (must be boolean)'];
    }

    if (!attributes.targetPrice) {
      errors['targetPrice'] = ['Invalid target price'];
    } else if (isNaN(attributes.targetPrice)) {
      errors['targetPrice'] = ['Invalid target price'];
    } else if (attributes.buy == true && attributes.targetPrice >= this.currentQuotePrice) {
      errors['targetPrice'] = ['Price higher than market price!'];
    }  else if (attributes.buy == false && attributes.targetPrice <= this.currentQuotePrice) { errors['targetPrice'] = ['Price lower than market price!'];
    }

    // Return false if it's valid,
    // or something truthy (i.e. the errors) if it's not valid
    if (Object.keys(errors).length > 0) {
      return errors;
    } else {
      return false;
    }
  },
  trade(quote, trigger) {
    const targetPrice = this.attributes.targetPrice;
    const symbol = this.attributes.symbol;
    const quoteSymbol = quote.attributes.symbol;
    const currentPrice = quote.attributes.price;
    const trade = this.attributes.buy ? currentPrice <= targetPrice : currentPrice >= targetPrice;
    if (quoteSymbol == symbol && trade) {
      this.bus.trigger(trigger, this);
      this.bus.trigger('eraseQuote', this);
    }
  }
});

export default Order;
