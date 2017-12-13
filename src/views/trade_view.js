import Backbone from 'backbone';
import Trade from '../models/trade';
const QuoteView = Backbone.View.extend({
  initialize(params){
    this.template = params.template;

  },

  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    console.log("I am rendering a new tradeView")





    return this;
  }



})

export default TradeView;
