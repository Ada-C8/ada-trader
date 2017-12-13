import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00
  },

  buy() {
    // event listener, click on buy or sell button, should call this function
    console.log("price is now " + this.get('price'));
    let buyPrice = this.get('price');
    console.log("buy price is " + buyPrice);
    let tradeHistoryBuy = this.get('symbol') + buyPrice + " BUY! "
    console.log(tradeHistoryBuy);
    let newPrice = buyPrice + 1.00;
    console.log("new price is now" + newPrice);
    this.set('price', newPrice)

    // Implement this function to increase the price by $1.00
  },

  sell() {
    // Implement this function to decrease the price by $1.00
    console.log("price is now " + this.get('price'));
    let sellPrice = this.get('price');
    console.log("Sell price is " + sellPrice);
    let tradeHistorySell = this.get('symbol') + sellPrice + " SELL! "
    console.log(tradeHistorySell);
    let newPrice = sellPrice - 1.00;
    console.log("new price is now" + newPrice);
    this.set('price', newPrice)
  },
});

export default Quote;
