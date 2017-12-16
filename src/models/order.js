import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  default: {
    symbol: 'UNDEF',
    targetPrice: 0.00,
  },

  initialize(params) {
    // this.bus = params.bus
    this.listenTo(this.attributes.quote, 'change', this.priceCheck);
  },

  validate() {

  },

  priceCheck() {
    let toBuy = this.get('quote')
    if (this.get('buy') && this.get('quote').get('price') <= this.get('targetPrice')) {
      this.set('buy', true)
      // this.bus.trigger('appendTrade', this.get('quote'))
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
});

export default Order;
