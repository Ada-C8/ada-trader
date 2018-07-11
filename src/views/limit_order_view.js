import Backbone from 'backbone';
import LimitOrder from '../models/limit_order';


const LimitOrderView = Backbone.View.extend({
  initialize(params){
    // debugger
    console.log(params);
    this.template = params.template;
    this.hamRadio = params.hamRadio;
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'update', this.checkTargetPrice);
    this.listenTo(this.hamRadio, 'update_price', this.checkTargetPrice);
  },
  addQuoteAttribute(quoteModel){
    if(!this.quoteModel){
    }
  },
  render(){

    const compiledTemplate =  this.template(this.model.toJSON());

    this.$el.html(compiledTemplate);
    return this;
  },
  events:{
    'click button.btn-cancel': 'cancelLimitOrder',
    // 'click form button.btn-buy': 'order_purchase',
    // 'click form button.btn-sell': 'order_sell',
  },
  cancelLimitOrder(){
    this.model.destroy();
  },
  checkTargetPrice(event){
    console.log('inside check target price');
    let thisSymbol = this.model.attributes.symbol;
    let buyTrue = this.model.attributes.buy;
    let targetPrice = this.model.attributes.targetPrice;
    if(event['symbol'] == thisSymbol){
      if(buyTrue && event['price'] <= targetPrice){
        this.hamRadio.trigger(`buy_${thisSymbol}`);
        this.model.destroy();
        console.log('destroyed order');
      }else if(!buyTrue && event['price'] >= targetPrice){
        this.hamRadio.trigger(`sell_${thisSymbol}`);
        his.model.destroy();
        console.log('destroyed order');
      }

    };
    //   console.log(' in the if statement and it matches');
    //   console.log(this);
    //   console.log("inside addListener");
    //   debugger
    //   let currentPrice = this.model.attributes.targetPrice;
    //   console.log(currentPrice);
    //   console.log('this price');
    //   if (buy == true){
    //     console.log('pie');
    //     if(currentPrice <= price){
    //       console.log('buying quote');
    //       this.buyQuote();
    //       this.trigger('deleteOrder');
    //       console.log('deleted Order');
    //     }
    //   } else if (currentPrice >= price) {
    //     console.log('selling quote');
    //     this.sellQuote();
    //   }
    //   return this;

  },
  // addQuoteAttribute(quote){
  //   console.log('in add quote attribute');
  //   if(this.get('symbol') == quote.get('symbol')){
  //     this.quote = quote;
  //   }
  // }
});

export default LimitOrderView;
