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
    // 'click button.btn-sell': 'sellQuote',
  },

  buyOrder(event) {
    event.preventDefault();
    console.log('placing new buy order');

    const formData = this.getFormData();
    // add buy and currentPrice attributes to the oblect
    formData['buy'] = 'true';
    // find quote model
    // console.log(this.quotes);
    let currentPrice = this.quotes.findWhere({ symbol: formData['symbol']}).get('price');
    formData['currentPrice'] = currentPrice;

    const buyOrder = new Order(formData);
    if (buyOrder.isValid()) {
      console.log('validations passed');
      this.model.add(buyOrder);
      this.clearFormData();
    } else {
      console.log('invalid order');
      buyOrder.destroy();
    }
  },

  clearFormData() {
    ['symbol', 'price-target'].forEach((field) => {
      this.$(`#order-entry-form input[name=${field}]`).val('');
    });
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
