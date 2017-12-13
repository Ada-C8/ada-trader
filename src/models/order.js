import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  initialize(params) {
    this.symbol = params.symbol;
    this.buy = params.buy;
    this.targetPrice = params.targetPrice;
    this.bus = params.bus;
    this.listenTo(this.bus, `priceChange${this.get('symbol')}`, this.attemptTrade);
  },
  validate(params) {
    const errors = {};

    if (!params.symbol) {
      errors['symbol'] = ["Symbol is required"];
    }

    if (!params.targetPrice) {
      errors['price'] = ["Price is required"];
    } else if ( typeof parseFloat(params.price) !== 'number' ) {
      errors['price'] = ["Price must be a number"];
    }

    if ( Object.keys(errors).length > 0 ) {
      return errors;
    } else {
      return false;
    }
  },
  attemptTrade(price) {
    if (this.get('buy')) {
      if (parseFloat(price) <= this.get('targetPrice')) {
        this.completeTrade(price);
      }
    } else {
      if (this.get('targetPrice') <= parseFloat(price)) {
        this.completeTrade(price);
      }
    }
  },
  completeTrade(price) {
    this.stopListening();
    const trade = {
      symbol: this.get('symbol'),
      buy: this.get('buy'),
      price: parseFloat(price),
    };
    this.destroy();
    this.bus.trigger('addTrade', trade);
  }
});

export default Order;
