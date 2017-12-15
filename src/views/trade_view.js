import Backbone from 'backbone';
import Trade from '../models/trade';

const TradeView = Backbone.View.extend({
  initialize(params){
    this.template = params.template;
    this.hamRadio = params.hamRadio;

    this.listenTo(this.model, 'change', this.render)

  },
  render(){
    const compiledTemplate =  this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);

    return this;
  },
  addTrade(event){
    this.model.newTrade(event);
    return this;
  },
  // events:{
  //   'click button.btn-buy': this.buyQuote(),
  //   'click button.btn-sell': this.sellQuote(),
  // },
  // buyQuote(event){
  //   this.model.buy();
  // },
  // sellQuote(event){
  //   this.model.sell();
  // },

});
export default TradeView;
