import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  default: {
    symbol: 'UNDEF',
    targetPrice: 0.00,
  },

  initialize(params) {
    if (!this.invalid()) {
      this.listenTo(this.attributes.quote, 'change', this.priceCheck);
    }
  },

  invalid() {
    let errors = {}
    if (this.get('symbol') === "" || this.get('symbol') === "UNEF") {
      errors.symbol = ['Invalid Symbol'];
    }

    if (this.get('buy') && this.get('quote').get('price') <= this.get('targetPrice')) {
      errors.price = ['Target Price higher than Market Price!' ]
    }

    if (!this.get('buy') && this.get('quote').get('price') >= this.get('targetPrice')) {
      errors.price = ['Target Price at or below Market Price!' ]
    }

    if (isNaN(this.get('targetPrice')) || this.get('targetPrice') <= 0) {
      errors.price = ['Invalid Price!']
    }

    if (Object.keys(errors).length > 0) {
      return errors
    } else {
      return false
    }

  },

  priceCheck() {
    let toBuy = this.get('quote')
    if (this.get('buy') && this.get('quote').get('price') <= this.get('targetPrice')) {
      this.set('buy', true)
      this.trigger('appendTrade', this.get('quote'))
      this.destroy()
      toBuy.buy();
    }

    if (!this.get('buy') && this.get('quote').get('price') >= this.get('targetPrice')) {
      this.set('buy', false)
      this.trigger('appendTrade', this)
      this.destroy()
      toBuy.sell();
    }
  }
});

export default Order;
