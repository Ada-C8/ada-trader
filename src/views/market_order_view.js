import Backbone from 'backbone';
import MarketOrder from '../collections/market_order';
import TradeView from './trade_view'
import Trade from '../models/trade';

const MarketOrderView = Backbone.View.extend({
  initialize(params){
    this.template = params.template;
    this.hamRadio = params.hamRadio;
    this.listenTo(this.hamRadio, 'bought_quote', this.addTrade);
    this.listenTo(this.hamRadio, 'sold_quote', (this.addTrade));
    this.listenTo(this.model, 'update', this.render);
  },
  events:{
    // 'click #add-new-task': 'addTask',
  },
  updateStatusMessageFrom(messageHash){

  },
  updateStatusMessage(message){

  },
  addTrade(model){
    console.log(event);
    console.log('thats the event');
    let tradeData = {symbol: model.attributes.symbol, price: model.attributes.price}
    let btnSell = event['target'].classList.contains('btn-sell')
    if( btnSell){
      tradeData['buy'] = false;
    }
    const newTrade = new Trade(tradeData);

    if(newTrade.isValid()){
      this.model.add(newTrade);
      this.updateStatusMessage(`${newTrade.get('symbol')} Created!`);
    }else{
      console.log('Something went wrong!');
      this.updateStatusMessageFrom(newTrade.validationError);
    }
    return newTrade;
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
      this.$('#trades').prepend(tradeView.render().$el);
    });

    return this;
  },
});

export default MarketOrderView;
