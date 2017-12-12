import Backbone from 'backbone';
import MarketOrder from './market_order';
import Trade from '../models/trade';

const MarketOrderView = Backbone.View.extend({
  initialize(params){
    this.template = params.template;

    this.listenTo(this.model, 'update', this.render);
  },
  events:{
    // 'click #add-new-task': 'addTask',
  },
  updateStatusMessageFrom(messageHash){

  },
  updateStatusMessage(message){

  },
  addTrade(event){
    event.preventDefault();
    const newTrade = new Trade();
    if(newTrade.isValid()){
      this.model.add(newTrade);
      this.updateStatusMessage(`${newTrade.get('symbol')} Created!`);
    }else{
      console.log('Something went wrong!');
      this.updateStatusMessageFrom(newTrade.validationError);
    }
  },
  render(){

    this.$('#trades').empty();
    this.model.each((trade) => {
      const tradeView = new TradeView({
        model: trade,
        template: this.template,
        tagName: 'li',
        className: 'trade'
      });
      this.$('#trades').append(tradeView.render().$el);
    });

    return this;
  },
});

export default MarketOrderView;
