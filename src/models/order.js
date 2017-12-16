import Backbone from 'backbone';
import Quote from 'models/quote';
// order needs quote
// Buy and Sell button creates the order

// order is listening to quote for changes in price
// when it hears the price changes the handler will have some logic to determine if the price is at a level in which to buy or sell

// before you have the quote buy or sell, you should destroy the order - to prevent duplicate buying or selling

const Order = Backbone.Model.extend({
  initialize: function(attributes) {
  },

});

export default Order;
