import Backbone from 'backbone';
import Quote from '../models/quote';


const QuoteView = Backbone.View.extend({
  initialize(params) {
    // here we're bringing in the params from the render function in quote list view, so template is still quote template, bus is same, model is same, and we also have a tag name (li) and class name (quotes) to use when we render this view.
    this.template = params.template;
    this.bus = params.bus;

    this.listenTo(this.model, 'change', this.render);


  }, //init

  render() {
    console.log("In the quote view render function");
    const compiledTemplate = this.template(this.model.toJSON());
    // will fill the template with data from the model instance. It will fit within an <li> with class quote (we sedt this when we called new);
    this.$el.html(compiledTemplate); //will set the html in the root element, which I think is just an empty div right now? to be the filled template for the instance, and return it

    return this;

  }, //render

  events: {
    'click button.btn-sell': 'sell',
    'click button.btn-buy': 'buy',
  },
// we set event listeners for clicks on either of these buttons in our view. Methods are defined in the quote.js model.

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
    const trade_data = {
      symbol: this.model.get('symbol'),
      price: this.model.get('price'),
      buy: buy,
    };
    console.log(trade_data);
    this.bus.trigger('record_trade', trade_data);
  },





}); //end of Quote View


export default QuoteView;
