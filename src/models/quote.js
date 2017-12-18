import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00,
  },

  initialize(params) {
    this.symbol = params.symbol;
    this.price = params.price;
    this.bus = params.bus;
    this.listenTo(this, 'change', this.triggerPriceChange);
  },

  buy() {
    this.set('price', this.get('price') + 1.00);
    return(this.get('price'));
  },

  sell() {
    if (this.get('price') > 1) {
      this.set('price', this.get('price') - 1.00);
    } else {
      this.set('price', 0.01);
    }
    return(this.get('price'));
  },

  triggerPriceChange() {
    this.bus.trigger(`priceChange${this.get('symbol')}`, this.get('price').toFixed(2));
  }
});

export default Quote;
