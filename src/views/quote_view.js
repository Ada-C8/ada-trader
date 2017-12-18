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
    // will fill the template with data from the model instance. It will fit within an <li>
    this.$el.html(compiledTemplate); //will set the html in the quotes-container (currently a div that contains a heading and the ul for #quotes) to be that of the template. //then back to quoteListview where it will be rattached to the quotes
  
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
