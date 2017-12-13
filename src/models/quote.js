import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00
  },

  buy() {
    // Get price at time of purchase
    const buyPrice = this.get('price')
    console.log(`Bought ${this.get('symbol')} at $${buyPrice}`);

    // increase the price by a dollar
    const newPrice = (buyPrice + 1);
    this.set('price', newPrice);
    console.log(`Buy - increased the price by a dollar, new price $${newPrice}`);

    // return the price so we can use it for the tradesView
    return buyPrice
  },

  sell() {
    // Get price at time of sell
    const sellPrice = this.get('price')
    console.log(`Sold ${this.get('symbol')} at $${sellPrice}`);

    // decrease the price by a dollar
    const newPrice = (sellPrice - 1);
    this.set('price', newPrice);
    console.log(`Sell - decreased the price by a dollar, new price $${newPrice}`);

    // return the price so we can use it for the tradesView
    return sellPrice
  },
});

export default Quote;
