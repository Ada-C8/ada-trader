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
    this.listenTo(this.hamRadio, 'send_quote', this.addQuoteAttribute);
    // this.listenTo(this.model.attributes.quote, 'update', this.checkTargetPrice);
  },
  addQuoteAttribute(quoteModel){
    if(!this.quoteModel){
      debugger;
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
  checkTargetPrice(){

    //
    // let listOrderAttributes = this.attributes;
    // let thisSymbol = this.attributes.symbol;
    // let buyTrue = this.model.attributes['buy'];
    // let targetPrice = listOrderAttributes['targetPrice'];
    // if(listOrderAttributes['symbol'] == thisSymbol){
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
  addQuoteAttribute(quote){
    console.log('in add quote attribute');
    if(this.get('symbol') == quote.get('symbol')){
      this.quote = quote;
    }
  }
});

export default LimitOrderView;
