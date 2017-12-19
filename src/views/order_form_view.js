import Backbone from 'backbone';
import _ from 'underscore';
import Order from '../models/order';
import OrderView from '../views/order_view';
import Quote from '../models/quote';
import QuoteView from '../views/quote_view';

const OrderFormView = Backbone.View.extend({
  initialize(params){
    this.template = params.template;
    this.bus = params.bus;
    this.quotesList = params.quotesList;
  },

  events: {
    'click button.btn-buy': 'buy',
    'click button.btn-sell': 'sell'
  },
  buy(event) {
    event.preventDefault();
    let orderData = {
      buy: true
    };

    orderData.symbol = this.$('#orderForm select').val();
    orderData.targetPrice = parseFloat(this.$('#target-price').val());
    orderData.quote = this.quotesList.findWhere({symbol: orderData.symbol});

    let order = new Order(orderData);
      if (!order.isValid()) {
        order.destroy();
        this.updateStatusMessage(order.validationError);
      return;
      }

      // validate(attributes) {
      //   let warning;
      //   if (!attributes.targetPrice) {
      //     warning = 'Target price can not be blank.';
      //   }
      //   if (this.getthis.get('targetPrice') <= quote.get('price')
      //     console.log('target price should be higher than current price');
    // Do validation on the order
    //orders.append(order);
    this.bus.trigger('newOrder', order);

  },

  sell(event) {
    event.preventDefault();
    let orderData = {
      buy: false
    };

    orderData.symbol = this.$('#orderForm select').val();
    orderData.targetPrice = parseFloat(this.$('#target-price').val());
    orderData.quote = this.quotesList.findWhere({symbol: orderData.symbol});

    let order = new Order(orderData);
    // Do validation on the order
    //orders.append(order);
    this.bus.trigger('newOrder', order);
    },


});
export default OrderFormView;
