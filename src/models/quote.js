import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00
  },

  buy() {
    // Implement this function to increase the price by $1.00
    this.makeTransaction((this.get('price') + 1.00), true);
  },

  sell() {
    // Implement this function to decrease the price by $1.00
    this.makeTransaction((this.get('price') - 1.00), false);
  },

  makeTransaction(newQuoteValue, isBuy){
    //attributes quote has
    const tradeData = {
      buy: isBuy,
      symbol: this.get('symbol'),
      price: this.get('price')
    }

    this.set('price', newQuoteValue);
    this.trigger('addTrade', tradeData); //QLV
  }
});

export default Quote;
