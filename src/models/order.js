import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  initialize(){
  },
  defaults:{
    symbol: 'UNDEF',
    targetPrice: 0.00
  },

  buy(){
    this.set('buy', true);
  },

  sell(){
    this.set('buy', false);
  },

  quotePriceCheck(){
    // if buy, check if the price is lower or equal
    console.log('in QuotePriceCheck');
    const quote = this.get('quote');
    if(this.get('buy') === true && (this.get('targetPrice') >= quote.get('price'))){
      console.log('in buy at quotePriceCheck at order model');
      quote.buy();
      this.destroy();
    // if sell, check if the price is higher or equal
  } else if(this.get('buy') === false && (this.get('targetPrice') <= quote.get('price'))){
      console.log('in sold at quotePriceCheck at order model');
      quote.sell();
      this.destroy();
    }
  }


});

export default Order;
