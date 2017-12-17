import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    targetPrice: 0.00,
    buy: true,
  },
  validate: function(attributes) {
    const errors = {};
    if (!attributes.targetPrice) {
      errors['targetPrice'] = ['Invalid target price'];
    } else if (isNaN(attributes.targetPrice)) {
      errors['targetPrice'] = ['Invalid target price'];
    } else if (attributes.buy == true && attributes.targetPrice >= attributes.currentQuotePrice) {
      errors['targetPrice'] = ['Price higher than market price!'];
    }  else if (attributes.buy == false && attributes.targetPrice <= attributes.currentQuotePrice) { errors['targetPrice'] = ['Price lower than market price!'];
    }

    // Return false if it's valid,
    // or something truthy (i.e. the errors) if it's not valid
    if (Object.keys(errors).length > 0) {
      return errors;
    } else {
      return false;
    }
  },
  trade(quote, i, trigger, buy) {
    const targetPrice = this.model.models[i].attributes.targetPrice;
    const symbol = this.model.models[i].attributes.symbol;
    const quoteSymbol = quote.attributes.symbol;
    const currentPrice = quote.attributes.price;
    const trade = buy ? currentPrice <= targetPrice : currentPrice >= targetPrice;
    if (quoteSymbol == symbol && trade) {
      this.bus.trigger(trigger, this.model.models[i]);
      this.bus.trigger('eraseQuote', this);
    }
  }
});

export default Order;
