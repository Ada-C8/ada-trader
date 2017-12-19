import Backbone from 'backbone';

const OpenOrder = Backbone.Model.extend({
  initialize(params) {
    this.quote = params.quote
    this.targetPrice = params.targetPrice
    this.listenTo(this.quote, 'change', this.check)
    this.bus = params.bus
  },

  defaults: {
    symbol: 'UNDEF',
    targetPrice: 0.00,
    buy: false,
    quote: null,
  },

  validate(params) {
    const errors = {}
    let marketPrice = params.quote.attributes.price
    if(params.buy) {
      if(isNaN(params.targetPrice) || params.targetPrice >= marketPrice){
        errors['targetPrice'] = [`Target price must be a number and lower than ${marketPrice}`];
      }
    } else {
      if(isNaN(params.targetPrice)  || params.targetPrice <= marketPrice){
        errors['targetPrice'] = [`Target price must be a number higher than ${marketPrice}`];
      }
    }
    if ( Object.keys(errors).length > 0 ) {
      return errors;
    } else {
      return false;
    }
  },

  check(model){
    if(this.attributes.buy) {
      if(model.attributes.price<=this.attributes.targetPrice) {
        this.bus.trigger('automatic_buy', this.quote)
        this.destroy()
      }
    }else{
      if(model.attributes.price>=this.targetPrice) {
        this.bus.trigger('automatic_sell', this.quote)
        this.destroy()
      }
    }
  },

});

export default OpenOrder;
