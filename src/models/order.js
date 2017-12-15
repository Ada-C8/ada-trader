import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  initialize(params) {
    this.bus = params.bus;
    this.quotes = params.quotes;

    this.listenTo(this.bus, `check${params.symbol}`, this.checkPrice)
  },

  getCurrentPrice() {
    const quote = this.quotes.findWhere({symbol: this.get('symbol')});

    if (quote) return quote.get('price');
    return undefined;
  },

  checkPrice(quote) {
    const buy = this.get('buy');
    const targetPrice = this.get('targetPrice');

    if (buy && targetPrice >= quote.get('price')) {
      this.bus.trigger(`buy${quote.get('symbol')}`);

      this.destroy();

    } else if (!buy && targetPrice <= quote.get('price')) {
      this.bus.trigger(`sell${quote.get('symbol')}`);

      this.destroy();
    }
  },
  validate(attributes) {
    const errors = {};
    const marketPrice = this.getCurrentPrice();
    const symbols = this.quotes.map(quote => quote.get('symbol'));

    // confirm presence
    if (!attributes.symbol) {
      errors['symbol'] = ['Cannot be blank'];
      // confirm valid symbol
    } else if (!symbols.includes(attributes.symbol)) {
      errors['symbol'] = ['Is not in the list'];
    }

    // confirm presence
    if (!attributes.targetPrice) {
      errors['targetPrice'] = ['Cannot be blank'];
      // confirm it's a number
    } else if (isNaN(attributes.targetPrice)) {
      errors['targetPrice'] = ['Must be a number'];
      // confirm number > 0
    } else if (attributes.targetPrice < 0) {
      errors['targetPrice'] = ['Must be greater than 0'];
    }

    // confirm limit order behavior
    if (attributes.buy && attributes.targetPrice > marketPrice) {
      errors['targetPrice'] = ['Cannot exceed market price'];
    }

    if (!attributes.buy && attributes.targetPrice < marketPrice) {
      errors['targetPrice'] = ['Cannot be less than market price'];
    }

    if (Object.keys(errors).length > 0) {
      return errors;
    }
    return false;
  },
});

export default Order;
