import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00
  },

  buy() {
    // make trade data object
    let tradeData = this.makeTradeData('buy', this)

    // Get price at time of purchase
    const buyPrice = this.get('price')
    console.log(`Bought ${this.get('symbol')} at $${buyPrice}`);

    // increase the price by a dollar
    const newPrice = (buyPrice + 1);
    this.set('price', newPrice);
    console.log(`Buy - increased the price by a dollar, new price $${newPrice}`);

    // return the tradeData so we can use it for the tradesView
    console.log(tradeData);
    return tradeData
  },

  sell() {
    let tradeData = this.makeTradeData('sell', this)

    // Get price at time of sell
    const sellPrice = this.get('price')
    console.log(`Sold ${this.get('symbol')} at $${sellPrice}`);

    // decrease the price by a dollar
    const newPrice = (sellPrice - 1);
    this.set('price', newPrice);
    console.log(`Sell - decreased the price by a dollar, new price $${newPrice}`);

    // return the tradeData so we can use it for the tradesView
    console.log(tradeData);
    return tradeData
  },

  makeTradeData(funName, model) {
    let data = model.attributes;
    data.buy = funName;
    return data
  },
});

export default Quote;
