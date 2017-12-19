import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  initialize(params) {
    this.targetPrice = params.targetPrice;
    this.symbol = params.symbol;
    this.bus = params.bus
    this.buy = params.buy;
    this.quote = params.quote;
    this.listenTo(this.quote, 'change', this.completeOrder);
  },
  validate(attributes) {
   const errors = {};

   // confirm presence of symbol
   if (!attributes.symbol) {
     errors['symbol'] = ['You must select the symbol for the stock you want to order'];
   }

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

   // check target price against market logic
   if (attributes.buy && attributes.targetPrice >= attributes.quote.get('price')) {
      errors['targetPrice'] = ['Your target price is higher than market price'];
    } else if (!attributes.buy && attributes.targetPrice <= attributes.quote.get('price')) {
      errors['targetPrice'] = ['Your target price is lower than market price'];
    }

   if (Object.keys(errors).length > 0) {
     return errors;
   }
   return false;
  },
  completeOrder() {
    if (this.buy && (this.quote.get('price') <= this.targetPrice)) {
      this.convertOrderToTrade();
      this.quote.buy();
    } else if (!this.buy && (this.quote.get('price') >= this.targetPrice)) {
      this.convertOrderToTrade();
      this.quote.sell();
    }
  },
  convertOrderToTrade() {
    // make sure the order is closed and doesn't trigger again
    this.stopListening();

    const trade = {
      symbol: this.symbol,
      buy: this.buy,
      price: parseFloat(this.quote.get('price')),
    };

    // remove from collection and from order list view
    this.destroy();
    // add to Trade History
    this.bus.trigger('newTrade', trade);
  },
});

export default Order;
