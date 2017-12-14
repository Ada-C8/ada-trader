import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  // will have attribute of quoteSymbol, which will be quote symbol
  defaults: {
    marketPrice: 0.00,
    targetPrice: 0.00,
  },

  // // quotes is a quoteList
  // findQuote(quotes) {
  //   return quotes.findWhere({symbol: this.quoteSymbol});
  // },
  //
  // getMarketPrice(quotes) {
  //   const quote = this.findQuote(quotes);
  //   return quote.get('price');
  // },

  validate(attributes) {
    const errors = {};

    if (!attributes.targetPrice) {
      errors['targetPrice'] = ['Cannot be blank'];
    }

    if (attributes.buy && attributes.targetPrice > attributes.marketPrice) {
      errors['targetPrice'] = ['Cannot exceed market price'];
    }

    if (!attributes.buy && attributes.targetPrice < attributes.marketPrice) {
      errors['targetPrice'] = ['Cannot be less than market price'];
    }

    if (Object.keys(errors).length > 0) {
      return errors;
    }
    return false;
  },
});

export default Order;
