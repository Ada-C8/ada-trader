import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;

    this.listenTo(this.model, 'change', this.render);

  }, //init

  render() {
    const compiledTemplate =
    this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);

    return this;


  }, //render

  events: {
    'click button.btn-buy': 'recordTrade',
    'click button.btn-sell': 'sell',
    // 'click button.btn-buy': 'record_trade',
    // 'click button.btn-sell': 'record_trade',
  },

  recordTrade(event) {
    console.log("We're triggering the record trade event!");
    console.log("bus is " + this.bus);
    console.log(this.model.get('symbol'));
    this.bus.trigger('record_trade', this.model);
    // this.model.recordTrade();
    // this.bus.trigger('record_trade', this.model, {symbol: this.get('symbol'), price: this.get('price'), buy: buy});
  },
  buy(event) {
    // this.$el.toggleClass('is-complete');
    console.log("You clicked buy");
    console.log(event);
    this.model.buy();
  },
  sell(event) {
    // this.$el.toggleClass('is-complete');
    console.log("You clicked Sell");
    console.log(event);
    this.model.sell();
  },


}); //end of Quote View


export default QuoteView;
