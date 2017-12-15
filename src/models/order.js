import Backbone from 'backbone';
import Quote from '../models/quote';

const Order = Backbone.Model.extend({
  // validate(attributes) {
  //   let warning;
  //   if (!attributes.targetPrice) {
  //     warning = 'Target price can not be blank.';
  //   }
  //
  //   const quotePrice = this.get('quote').get('price');
  //   const invalidBuy = this.get('buy') && (quotePrice <= this.get('targetPrice'))
  //   const invalidSell = !this.get('buy') && (quotePrice >= this.get('targetPrice'))
  //
  //   if (invalidBuy || invalidSell) {
  //     errors = `to set a ${invalidBuy ? 'buy' : 'sell'} order, targetPrice must be ${invalidBuy ? 'lower' : 'higher'} than current price`; //is this the right place to be doing this validation?
  //   }
  //
  //   if ( warning ) {
  //     return warning;
  //   } else {
  //     return false;
  //   }

    // if (this.get('targetPrice') <= quote.get('price')
    //   console.log('target price should be higher than current price');
    //
    //
    //   validate(attributes) {
    //       let errors;
    //       if (!attributes.targetPrice) {
    //         errors = 'A target price is required.';
    //         // because the form type is number, I don't need to validate numericality
    //       }
    //
    //       const quotePrice = this.get('quote').get('price');
    //       const invalidBuy = this.get('buy') && (quotePrice <= this.get('targetPrice'))
    //       const invalidSell = !this.get('buy') && (quotePrice >= this.get('targetPrice'))
    //
    //
    //     },




  buyit(){
    const quote = this.get('quote');

    if (this.get('targetPrice') >= quote.get('price') ||
        this.get('targetPrice') === ''){
          quote.buy();
          return true;
        }
        return false;
  },

  sellIt(){
    const quote = this.get('quote');

    if (this.get('targetPrice') <= quote.get('price') ||
        this.get('targetPrice') === '') {

      quote.sell();
      return true;
    }
    return false;
  }
});

export default Order;
