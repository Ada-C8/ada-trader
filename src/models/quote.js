import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00
  },

  buy() {
    const data = {
    }
    data.buy = true;
    data.symbol = this.get('symbol');
    data.price = this.get('price')
    console.log("BUYING")
    this.trigger('appendTrade', data);

    this.set('price', this.get('price') + 1.00)

  },

  sell() {
    const data = {
    }
    data.buy = false;
    data.symbol = this.get('symbol');
    data.price = this.get('price')

    this.trigger('appendTrade', data);
    this.set('price', this.get('price') - 1.00)
  },

});

export default Quote;
