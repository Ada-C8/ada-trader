import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00
  },
  buy() {
    // Implement this function to increase the price by $1.00
    const tradeData = {
      buy: true,
      symbol: this.get('symbol'),
      price: this.get('price'),
    };
    this.set('price', (this.get('price') + 1.00));
    this.trigger('clickedBuyOrSellQuote', tradeData);

  },
  sell() {
    // Implement this function to decrease the price by $1.00
    const tradeData = {
      buy: false,
      symbol: this.get('symbol'),
      price: this.get('price'),
    };
    this.set('price', (this.get('price') - 1.00));
    this.trigger('clickedBuyOrSellQuote', tradeData);

  },
});

export default Quote;
