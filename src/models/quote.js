import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00
  },

  buy() {
    // get trade data before we change price and make tradeData object
    let tradeData = this.makeTradeData(this, 'bought')

    // Get price at time of purchase
    const buyPrice = this.get('price')
    console.log(`Bought ${this.get('symbol')} at $${buyPrice}`);

    // increase the price by a dollar
    const newPrice = (buyPrice + 1);
    this.set('price', newPrice);
    console.log(`Buy - increased the price by a dollar, new price $${newPrice}`);

    // return the tradeData so we can use it for the tradesView
    return tradeData
  },

  sell() {
    // get trade data before we change price and make tradeData object
    let tradeData = this.makeTradeData(this, 'sold')

    // Get price at time of sell
    const sellPrice = this.get('price')
    console.log(`Sold ${this.get('symbol')} at $${sellPrice}`);

    // decrease the price by a dollar
    this.set('price', (sellPrice - 1));
    console.log(`Sell - decreased the price by a dollar, new price $${(sellPrice - 1)}`);

    // return the tradeData so we can use it for the tradesView
    return tradeData
  },

  // makes an object of trade data that will be used to make tradesView
  makeTradeData(model, action) {
    let data = model.attributes;
    data.buy = action;
    return data
  },
});

export default Quote;
