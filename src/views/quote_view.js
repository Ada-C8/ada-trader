import Backbone from 'backbone';
import Quote from '../models/quote';


const QuoteView = Backbone.View.extend({

initialize(params) {
  this.template = params.template;
// params is an object we pass in
// contains standard values bb expects
// out params will contain an underscore template
//in initialze we store the template from params in its own property called template. One per each view.
}, //init

render() {
  const compiledTemplate =
  this.template(this.model.toJSON());

  this.$el.html(compiledTemplate);
  this.listenTo(this.model, "change", this.render);

  return this;


}, //render

events: {
  'click button.btn-buy': 'buy',
  'click button.btn-sell': 'sell',
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
