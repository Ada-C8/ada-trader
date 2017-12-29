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
      errors['price'] = ["Invalid target price"];
    }

    if ( Object.keys(errors).length > 0 ) {
      return errors;
    } else {
      return false;
    }
  },
  attemptTrade(price) {
    if (this.isValidBuy(price) || this.isValidSell(price)) {
      this.completeTrade(price);
    }
  },
  isValidBuy(price) {
    return this.get('buy') && parseFloat(price) <= this.get('targetPrice');
  },
  isValidSell(price) {
    return !this.get('buy') && this.get('targetPrice') <= parseFloat(price);
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
