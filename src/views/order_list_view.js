import Backbone from 'backbone';
import Quote from '../models/quote';
import Order from '../models/order';
import OrderView from '../views/order_view';

const OrderListView = Backbone.View.extend ({
  initialize(params) {
    this.template = params.template;
    this.quotes = params.quotes;
    this.listenTo(this.model, 'update', this.render);
  },

  render() {
    this.$('#orders').empty();
    // create new open orders
    this.model.each((order) => {
      const orderView = new OrderView({
        model: order,
        template: this.template,
        tagName: 'li',
        className: 'orders',
      });

      this.$('#orders').append(orderView.render().$el);
    });
    return this;
  },

  events: {
    'click button.btn-buy': 'buyOrder',
    'click button.btn-sell': 'sellOrder',
  },

  buyOrder(event) {
    event.preventDefault();
    console.log('placing new buy order');
    this.makeOrder(true);
  },

  sellOrder(event) {
    event.preventDefault();
    console.log('placing new sell order');
    this.makeOrder(false);
  },

  makeOrder(option) {
    const formData = this.getFormData();
    formData['buy'] = option;

    let currentPrice = this.quotes.findWhere({ symbol: formData['symbol']}).get('price');
    formData['currentPrice'] = currentPrice;

    const newOrder = new Order(formData);
    if (newOrder.isValid()) {
      console.log('validations passed');
      this.model.add(newOrder);
      this.clearFormData();
    } else {
      console.log('invalid order');
      newOrder.destroy();
    }
  },

  clearFormData() {
    // ['symbol', 'price-target'].forEach((field) => {
      // this.$(`#order-entry-form input[name=${field}]`).val('');
    // });
    this.$('form input[name=price-target]').val('');
    this.$('form select[name=symbol]').val('');
  },

  getFormData() {
    const orderData = {};

    let val = this.$('form input[name=price-target]').val();
    if (val != '') {
      orderData['targetPrice'] = parseInt(val);
    }

    val = this.$('form select[name=symbol]').val();
    if (val != '') {
      orderData['symbol'] = val;
    }

    console.log(orderData);
    return orderData;
  },



  // buyQuote(event) {
  //   console.log('buying quote');
  //   this.model.buy();
  //   const quote = {
  //     price: this.model.get('price'),
  //     symbol: this.model.get('symbol'),
  //     buy: true,
  //   }
  //   this.trigger('add_trade', quote);
  // },
  //
  // addTrade(quote) {
  //   console.log('passing new trade to trades view');
  //   this.trigger('add_trade', quote);
  // }


  // buy action


});

export default OrderListView;
