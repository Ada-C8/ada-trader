import Backbone from 'backbone';
import Quote from '../models/quote';


const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;

    this.listenTo(this.model, 'change', this.render);
    // this.listenTo(this.model, 'change', this.checkLimitOrders);
    //if there's any change (including in quote price), check for orders
    //if there's an order that meets the criteria -- buy or sell it!
    // this.listenTo(this.bus, "buy_order", this.buy);
    // this.listenTo(this.bus, "sell_order", this.sell);

  }, //init

  render() {
    console.log("In the quote view render function");
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);

    return this;

  }, //render

  events: {
    'click button.btn-sell': 'sell',
    'click button.btn-buy': 'buy',
  },
// we set event listeners for clicks on either of these buttons in our view. Methods are defined in the quote.js model.

  buy(event) {
    console.log("You clicked buy");
    this.recordTrade(true)
    this.model.buy();
    //
  },
  sell(event) {
    console.log("You clicked Sell");
    this.recordTrade(false)
    this.model.sell();
  },
  recordTrade(buy) {
    console.log("We're triggering the record trade event!");
    const trade_data = {
      symbol: this.model.get('symbol'),
      price: this.model.get('price'),
      buy: buy,
    };
    console.log(trade_data);
    this.bus.trigger('record_trade', trade_data);
  },

  // checkLimitOrders() {
  //   console.log("in check limit orders");
  //   this.bus.trigger('price_change', this.model);
  //   // trigger a to the order view that a price has changed, and send model attributes
  // },



}); //end of Quote View


export default QuoteView;
