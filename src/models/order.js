import Backbone from 'backbone';
import Quote from 'models/quote';

// const zquote = new Quote();

const Order = Backbone.Model.extend({
  initialize(attributes) {
    this.buy = attributes.buy;
    this.targetPrice = attributes.targetPrice;
    this.symbol = attributes.symbol;
    // this.listenTo(zquote, 'change', this.placeOrder);
  },
  //
  // placeOrder() {
  //   console.log('click');
  //   if ((this.buy === true) && (this.targetPrice >= Quote.model.get('price'))) {
  //     this.trigger('deleteOrder');
  //     Quote.buy();
  //   } else if ((this.buy === false) && (this.targetPrice <= Quote.model.get('price'))) {
  //     this.trigger('deleteOrder');
  //     Quote.sell();
  //   }
  // },
});

export default Order;
