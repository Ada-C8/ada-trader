import Backbone from 'backbone';
import MarketOrder from '../collections/market_order';
import TradeView from './trade_view'
import Trade from '../models/trade';

const MarketOrderView = Backbone.View.extend({
  initialize(params){
    this.template = params.template;
    this.hamRadio = params.hamRadio;
    this.listenTo(this.hamRadio, 'bought_quote', this.buyTrade);
    this.listenTo(this.hamRadio, 'sold_quote', (this.sellTrade));
    this.listenTo(this.model, 'update', this.render);
  },
  events:{
    // 'click #add-new-task': 'addTask',
  },
  updateStatusMessageFrom(messageHash){

  },
  updateStatusMessage(message){

  },
  buyTrade(model){
    console.log(model);
    console.log('this is the model');
    const newTrade = new Trade({symbol: model.attributes.symbol, price: model.attributes.price, buy: false});

    if(newTrade.isValid()){
      this.model.add(newTrade);
      this.updateStatusMessage(`${newTrade.get('symbol')} Created!`);
    }else{
      console.log('Something went wrong!');
      this.updateStatusMessageFrom(newTrade.validationError);
    }
    return newTrade;
  },
  sellTrade(model){
    console.log(model);
    console.log('this is the model');
    const newTrade = new Trade({symbol: model.attributes.symbol, price: model.attributes.price});
    console.log(newTrade);

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
      this.$('#trades').append(tradeView.render().$el);
    });

    return this;
  },
});

export default MarketOrderView;
