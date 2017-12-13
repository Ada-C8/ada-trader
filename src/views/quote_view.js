import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'change', this.render);
    this.bus = params.bus;
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  events: {
    'click button.btn-buy': 'buy',
    'click button.btn-sell': 'sell',
  },
  buy(event) {
    console.log('buying');
    this.model.buy();
    // console.log(this.model.price)
    // let tradeData = {
    // };
    this.bus.trigger('selected_trade', this.model);
  },
  sell(event) {
    console.log('selling');
    this.model.sell();
    this.bus.trigger('selected_trade', this.model);
  },
});

export default QuoteView;
