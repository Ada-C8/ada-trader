import Backbone from 'backbone';
import Quote from '../models/quote';
import Order from '../models/order';
import OrderList from '../collections/order_list';
import $ from 'jquery';

const OrderFormView = Backbone.View.extend({
  initialize(params) {
    this.orderList = params.orderList;
    this.quoteList = params.quoteList;
    console.log(params);
  },
  render() {
    console.log('you are in the order form view render');
    // console.log(this.quotelist)

    this.quoteList.each((quote)=> {
      console.log(quote.get('symbol'));
      this.$('#select').append($(`<option> ${quote.get('symbol')}</option>`));
    });
    return this;
  },
  events: {
    'click button.btn-buy': 'buy',
    'click button.btn-sell': 'sell',
  },
  buy(event) {
    console.log(event);
    event.isBuy = true;
    this.addNewOrder(event);
  },
  sell(event) {
    console.log(event);
    event.isBuy = false;
    this.addNewOrder(event);

  },
  addNewOrder(event) {
    console.log('in the add new order');
    event.preventDefault();
    const orderData = {};
    orderData['symbol'] = $('select[name=symbol]').val();
    orderData['targetPrice'] = parseFloat($('input[name=price-target]').val());
    orderData['quote'] = this.quoteList.findWhere({symbol: orderData['symbol']});

    orderData['buy'] = event.isBuy;

    console.log(orderData);

    const newOrder = new Order(orderData);

    // if (newOrder.isValid()) {
      this.orderList.push(newOrder);
      console.log(this.orderList);
    // }

    this.$('select[name=symbol]').val('');
    this.$('input[name=price-target]').val('');
  },
});

export default OrderFormView;
