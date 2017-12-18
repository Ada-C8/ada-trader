import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  initialize(params){
    this.template = params.template;
    this.hamRadio = params.hamRadio;
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.hamRadio, 'add_listener', this.addListener);
    // this.listenTo(this.model, 'update', );
  },
  render(){
    const compiledTemplate =  this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  events:{
    'click button.btn-buy': 'buyQuote',
    'click button.btn-sell': 'sellQuote',

  },
  addListener(event){

    let listOrderAttributes = event.models[0].attributes;
    let thisSymbol = this.model.attributes.symbol;
    let buyTrue = event.models[0].attributes['buy'];
    let targetPrice = listOrderAttributes['targetPrice'];
    if(listOrderAttributes['symbol'] == thisSymbol){
      console.log(' in the if statement and it matches');
      console.log(this);
      console.log("inside addListener");
      this.listenTo(this.model, 'update', this.checkTargetPrice(targetPrice, buyTrue));
    }
    return this;
  },
  checkTargetPrice(price, buy){
    debugger
    let currentPrice = this.model.attributes.price;
    console.log(currentPrice);
    console.log('this price');
    if (buy == true){
      console.log('pie');
      if(currentPrice <= price){
        console.log('buying quote');
        this.buyQuote();
        this.trigger('deleteOrder');
        console.log('deleted Order');
      }
    } else if (currentPrice >= price) {
      console.log('selling quote');
      this.sellQuote();
    }
    // return this;
  },

  buyQuote(){

    this.model.buy();
    this.hamRadio.trigger('sold_quote', this.model);
    return this;
  },
  sellQuote(){
    this.model.sell();
    this.hamRadio.trigger('bought_quote', this.model);
    console.log(this.model);
    return this;
  },

});
export default QuoteView;
