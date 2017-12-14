import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  initialize(params) {
    this.bus = params.bus;
    this.quotes = params.quotes;

    // this.listenTo(this.bus, `check${this.get('symbol')}`, this.checkPrice)
    this.listenTo(this.bus, `check${params.symbol}`, this.checkPrice)
  },

  getCurrentPrice() {
    const quote = this.quotes.findWhere({symbol: this.get('symbol')});
    return quote.get('price');
  },

  checkPrice(quote) {
    const buy = this.get('buy');
    const targetPrice = this.get('targetPrice');

    if (buy && targetPrice >= quote.get('price')) {
      this.bus.trigger(`buy${quote.get('symbol')}`);

      // this.removeOrder();
      this.destroy();

    } else if (!buy && targetPrice <= quote.get('price')) {
      this.bus.trigger(`sell${quote.get('symbol')}`);

      // this.removeOrder();
      this.destroy();
    }
  },
  validate(attributes) {
    const errors = {};
    const marketPrice = this.getCurrentPrice();

    if (!attributes.targetPrice) {
      errors['targetPrice'] = ['Cannot be blank'];
    }

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
