import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  // this will run any time you create a new instance
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;

    // listens for change events on models and calls render to redraw the view. Any time the model changes it triggers a change event
    this.listenTo(this.model, 'change', this.render);

    // listens to the bus and waits for a message from the orderListView to tell us that and order should be converted to a buy or sell action, when it hears the message it calles buyOrSellStock which determines which action takes place
    this.listenTo(this.bus, 'orderExecute', this.buyOrSellStock);
  },

  // Events Ojects
  events: {
    'click button.btn-buy' : 'buyStock',
    'click button.btn-sell' : 'sellStock',
  },

  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);

    // send a quotePriceUpdate message on the bus each time the quoteView gets redrawn, which happens when a quote price gets updated by the simulator
    // the orderListView will be listening and will determine if the price change triggers a buy or sell action
    this.bus.trigger('quotePriceUpdate', this.model);

    return this;
  },

  buyStock() {
    const tradeData = this.model.buy();
    console.log('in buyStock method in quote view, here is trade data object');
    // console.log(tradeData);

    this.bus.trigger('buyOrSell', tradeData);
  },

  sellStock() {
    const tradeData = this.model.sell();
    console.log('in sellStock method in quote view, here is trade data object');
    // console.log(tradeData);

    this.bus.trigger('buyOrSell', tradeData);
  },

  buyOrSellStock(orderInfo) {
    console.log('inside buyOrSellStock, orderExecute message recieved');
    // this method should figure out which method to buy or sell stock to call once the orderExecute

    // all 4 instances of quote recieve this message and this method gets triggered
    // if the order symbol matches the quote symbol call buy or sell stock otherwise do nothing

    if (orderInfo.symbol === this.model.get('symbol')){
      console.log('order and quote symbol match');
      orderInfo.buy ? this.buyStock() : this.sellStock();
    } else {
      console.log('no match do nothing');
    }
  },
});

export default QuoteView;
