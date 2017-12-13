import Backbone from 'backbone';

const OpenOrder = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    targetPrice: 0.00,
    buy: false,
  },

  // validate(attributes) {
  //   const errors = {}
  //   if(buy) {
  //     if(targetPrice === 0 || targetPrice >= 'marketprice'){
  //       errors['targetPrice'] = [`Target price must be higher than 0 and lower than ${marketprice}`];
  //     }
  //   } else {
  //     if(targetPrice === '')
  //   }
  //
  //   //if action is buy and target price is blank or higher than or equal to market price it is not valid
  //   //if action is sell and target price is blank or lower than or equal to market price not valid
  // }

});

export default OpenOrder;
