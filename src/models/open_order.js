import Backbone from 'backbone';

const OpenOrder = Backbone.Model.extend({

  validate(attributes){
    const errors = {};
    if (!attributes.symbol) {
      errors['Symbol'] = ['Validate failed: Symbol is required'];
      console.log(errors['Symbol'])
      return errors; //return here b/c quotePrice check fails
      //without symbol
    }

    if (!attributes.targetPrice) {
      errors['targetPrice'] = ['Validate failed: Price is required'];
      console.log(errors['targetPrice'])
    }

    let quotePrice = attributes.quote.get('price')
    if (attributes.buy){
      if (quotePrice <= attributes.targetPrice){
        errors['buyPrice'] = ['Validate failed: Target price is higher than the current price'];
        console.log(errors['buyPrice'])
      }
    } else {
      if (quotePrice >= attributes.targetPrice)
      errors['sellPrice'] = ['Validate failed: Target price is lower than the current price'];
      console.log(errors['sellPrice'])
    }
  if ( Object.keys(errors).length > 0 ) {
    // $('.form-errors').append(errors)
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
