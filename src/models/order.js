import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  initialize(params) {
    this.targetPrice = params.targetPrice;
    this.symbol = params.symbol;
    // this.price = params.price;
    this.bus = params.bus
    this.buy = params.buy;
    // this.template = params.template;
    this.quote = params.quote;
  },
  validate(attributes) {
   const errors = {};

   // confirm presence of symbol
   if (!attributes.symbol) {
     errors['symbol'] = ['Cannot be blank'];
   } //  TODO: confirm VALID Symbol

   // confirm presence of Target price
   if (!attributes.targetPrice) {
     errors['targetPrice'] = ['You must provide a target price for your open order'];
     // confirm it's a number
   } else if (isNaN(attributes.targetPrice)) {
     errors['targetPrice'] = ['Your target price must be a valid number'];
     // confirm number > 0
   } else if (attributes.targetPrice < 0) {
     errors['targetPrice'] = ['Your target price must be greater than zero. '];
   }

   // TODO: Check if Price on Order form exceeds or does not meet target price based on the type of order. Would need to validate current quote Market Price against Open Order Target price

   if (Object.keys(errors).length > 0) {
     return errors;
   }
   return false;
 },
});

export default Order;
