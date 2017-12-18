import Backbone from 'backbone';
import Quote from '../models/quote';
// import QuoteView from '../views/quote_view';
import Order from '../models/order';
import OrderList from '../collections/order_list';
import $ from 'jquery';


const OrderFormView = Backbone.View.extend({
  initialize(params) {
    //maybe move the stuff in orderlistview to here??
    this.orderList = params.orderList;
    this.quoteList = params.quoteList;
  },

  render() {
    this.quoteList.each((quote)=> {
      this.$('#symbol').append($(`<option>${quote.get('symbol')}</option>`));
    });
    return this;
  },

  events: {
    'click button.btn-buy': 'buy',
    'click button.btn-sell': 'sell',
    // 'click button.btn-buy': 'addNewOrder',
    // 'click button.btn-sell': 'addNewOrder',
  },
  buy(event) {
    // event.preventDefault();
    console.log(event);
    event.isBuy = true;
    this.addNewOrder(event);
  },
  sell(event) {
    // event.preventDefault();
    console.log(event);
    event.isBuy = false; //I added this to be able to send this info to addneworder, you can add any text you want after event.
    this.addNewOrder(event);
  },

  addNewOrder(event) {
    console.log(event);
    event.preventDefault();
    const orderData = {};
    orderData['symbol'] = $('select[name=symbol]').val();
    orderData['targetPrice'] = parseFloat($('input[name=targetPrice]').val());
    orderData['quote'] = this.quoteList.findWhere({symbol: orderData['symbol']});
    // console.log(orderData['quote'].get('symbol'));
    // if (val != '') {
    //   orderData[field] = val;
    // }

    orderData['buy'] = event.isBuy;

    const newOrder = new Order(orderData);
    //console.log(newOrder);
    // console.log(orderData);

    if (newOrder.isValid()) {
      this.orderList.add(newOrder);
      // console.log("you added a new order")
      // console.log(this.orderList.at(0));
    }
    else {
      console.log("Not a valid order: " + newOrder.validationError);
    }
    //   updateStatusMessageWith(`New order added: ${newTask.get('task_name')}`);
    // } else {
    //   updateStatusMessageFrom(newTask.validationError);
    // }

    //Emptying out the form after
    this.$('select[name=symbol]').val('');
    this.$('input[name=targetPrice]').val('');
  },

});

export default OrderFormView;
