import Backbone from 'backbone';
import Quote from 'models/quote';

const Order = Backbone.Model.extend({
  defaults:{
    symbol: 'UNDEF',
    targetPrice: 0.00
    //buy: true or false
    //quote: assigned at render in OrderListView
  },

  validate(attributes){
    const errors = {};

    if (attributes.targetPrice <= 0.00) {
      errors['targetPrice'] = ['Target price must be a valid decimal above 0.'];
    }

    if (attributes.symbol === 'UNDEF' || attributes.symbol === undefined){
      errors['symbol'] = ['Symbol is undefined.'];
    }

    if (attributes.quote === undefined){
      errors['quote'] = ['Order has to have an associated quote.'];
    }

    if (attributes.buy === undefined){
      errors['buy'] = ["Order has to know whether it's buying/selling a quote."]
    }

    // attribute type validations

    if(typeof attributes.targetPrice !== 'number') {
      errors[''] = ["order's targetPrice is not of type Number"];
    }

    if(typeof attributes.symbol !== 'string') {
      errors[''] = ["order's symbol is not of type String"];
    }

    if(typeof attributes.buy !== 'boolean') {
      errors[''] = ["order's buy is not of type Boolean"];
    }

    if(!attributes.quote instanceof Quote) {
      errors[''] = ["order's quote is not an instance of Quote"];
    }

    if ( Object.keys(errors).length > 0 ) {
      return errors;
    } else {
      return false;
    }

    // "check current price of quote" validations
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
