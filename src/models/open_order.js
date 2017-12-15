import Backbone from 'backbone';

const OpenOrder = Backbone.Model.extend({

  validate(attributes){
    const errors = {};

    if (!attributes.targetPrice) {
      errors['targetPrice'] = ['Validate failed: Price is required'];
      console.log(errors['targetPrice'])
    }

    // if (attributes.buy === true){
    //   if (quotePrice >= targetPrice){
    //     errors['buyPrice'] = ['Validate failed: quotePrice is greater than or equal to Open Order target price'];
    //     console.log(errors['buyPrice']);
    //   } else {
    //     if (quotePrice >= targetPrice){
    //       errors['sellPrice'] = ['Validate failed: quotePrice is less than or equal to Open Order target price'];
    //       console.log(errors['sellPrice']);
    //     }
    //   }
    // }

    if ( Object.keys(errors).length > 0 ) {
      return errors;
    } else {
      return false;
    }
  },

  validTransaction(quote) {
    let buy = this.get('buy')
    let targetPrice = this.get('targetPrice')
    let quotePrice = quote.get('price')
    //only buy an order if the quotePrice is less than the openOrder targetPrice
    if (buy === true) {
      if (quotePrice < targetPrice) {
        return 'buy';
      }
    }
    //only sell an order if the quotePrice is more than the openOrder targetPrice
    if (buy === false){
      if (quotePrice > targetPrice) {
        return 'sell';
      }
    }
    //otherwise do nothing
    return 'hold';
  },

  deleteOrder() {
    console.log('deleting order')
    this.destroy();
  },
});
export default OpenOrder;
