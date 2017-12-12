import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  initialize(params) { //where do the params come from?
    this.template = params.template; //I find this strange as well

    this.listenTo(this.model, 'change', this.render)
    //anytime the model changes, it will redraw it
  },

  render() {
    const compiledTemplate = this.template(this.model.toJSON()); //Don't understand exactly how this works

    this.$el.html(compiledTemplate);

    return this;
  },
  events: {
    'click button.btn-buy': 'buy',
    'click button.btn-sell': 'sell',
  },
  buy(event) {
    console.log(event);
    this.model.buy();
    // this.remove();
  },
  sell(event) {
    console.log(event);
    this.model.sell();
  },


});

export default QuoteView;
