import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  default: {
    symbol: 'UNDEF',
    targetPrice: 0.00,
  },

  initialize(params) {
    if (!this.validate()) {
      this.listenTo(this.attributes.quote, 'change', this.priceCheck);
    }
  },

  validate() {
    let errors = {}
    if (this.symbol === "" || this.symbol === "UNEF") {
      errors.symbol = ['You must select a valid symbol'];
    }

    if (this.get('buy') && this.get('quote').get('price') < this.get('targetPrice')) {
      errors.price = ['The current price is lower than your target price. You wasting yo money.' ]
    }

    if (isNaN(this.get('targetPrice')) || this.get('targetPrice') <= 0) {
      errors.price = ['Target Price must be a number greater than 0']
    }

    if (errors) {
      $('errors').empty()
      for (let error in errors) {
        $('#errors').append(`${error}`)
      }
      return false
    }
  },

  priceCheck() {
    let toBuy = this.get('quote')

    if (this.validate) {
      if (this.get('buy') && this.get('quote').get('price') <= this.get('targetPrice')) {
        this.set('buy', true)
        this.trigger('appendTade', this.get('quote'))
        this.destroy()
        toBuy.buy();
      }

      if (!this.get('buy') && this.get('quote').get('price') >= this.get('targetPrice')) {
        this.model.set('buy', false)
        this.trigger('appendTrade', this)
        this.destroy()
        toBuy.sell();
      }
    }
    }
});

export default Order;
