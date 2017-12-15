import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  default: {
    symbol: 'UNDEF',
    targetPrice: 0.00,
  },

  initialize(params) {
    this.bus = params.bus
    console.log("You placed an order!")
    console.log(this.attributes);
  },

  validate() {
    
  },

  priceCheck() {
    let toBuy = this.attributes.quote
    if (this.attributes.buy && this.attributes.quote.price <= this.targetPrice) {
      this.attributes.quote.destroy()
      toBuy.buy();
    }

    if (!this.attributes.buy && this.attributes.quote.price >= this.targetPrice) {
      this.attributes.quote.destroy()
      toBuy.buy();
    }
  }


});

export default Order;
