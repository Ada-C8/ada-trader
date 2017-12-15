import Backbone from 'backbone';
import Quote from '../models/quote';


const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;

    this.listenTo(this.model, 'change', this.render);

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


  buy(event) {
    console.log("You clicked buy");
    console.log(event);
    this.recordTrade(true)
    this.model.buy();
  },
  sell(event) {
    console.log("You clicked Sell");
    console.log(event);
    this.recordTrade(false)
    this.model.sell();
  },
  recordTrade(buy) {
    console.log("We're triggering the record trade event!");
    // console.log("bus is " + this.bus);
    // console.log(this.model.get('symbol'));
    const trade_data = {
      symbol: this.model.get('symbol'),
      price: this.model.get('price'),
      buy: buy,
    };
    console.log(trade_data);
    this.bus.trigger('record_trade', trade_data);
    // this.model.recordTrade();
    // this.bus.trigger('record_trade', this.model, {symbol: this.get('symbol'), price: this.get('price'), buy: buy});
  },




}); //end of Quote View


export default QuoteView;
