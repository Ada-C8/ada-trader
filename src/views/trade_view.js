import Backbone from 'backbone';
import Trade from '../models/trade';

const TradeView = Backbone.View.extend({
  initialize(params){
    this.template = params.template;
    this.hamRadio = params.hamRadio;

    this.listenTo(this.model, 'change', this.render)

  },
  events:{
    // 'click button.btn-cancel': 'cancelLimitOrder',
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
  cancelLimitOrder(){
    this.model.destroy();
  }

  // buyQuote(event){
  //   this.model.buy();
  // },
  // sellQuote(event){
  //   this.model.sell();
  // },

});
export default TradeView;
