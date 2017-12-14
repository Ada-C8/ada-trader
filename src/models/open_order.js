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
        errors['targetPrice'] = [`Target price must be higher than 0 and lower than ${marketPrice}`];
        console.log('error!!!!');
      }
    } else {
      if(isNaN(params.targetPrice)  || params.targetPrice <= marketPrice){
        errors['targetPrice'] = [`Target price must be a number higher than ${marketPrice}`];
        console.log('err');
      }
    }
    if ( Object.keys(errors).length > 0 ) {
      return errors;
    } else {
      return false;
    }

    //if action is buy and target price is blank or higher than or equal to market price it is not valid
    //if action is sell and target price is blank or lower than or equal to market price not valid
  },
  check(model){
    if(this.attributes.buy) {
      console.log('buy');
      if(model.attributes.price<=this.attributes.targetPrice) {
        this.bus.trigger('automatic_buy', this.quote)
        //can I do this before I have confirmation that the trade has been made?
        //maybe put a trigger on making event and a listener on orderView and if a trade has
        //been made check to see if there is an openorder ????
        this.destroy()
      }
    }else{
      if(model.attributes.price>=this.targetPrice) {
        console.log('autosell');
        this.bus.trigger('automatic_sell', this.quote)
        this.destroy()
      }
    }
    // if its the right price, trigger event
  },

});

export default OpenOrder;
