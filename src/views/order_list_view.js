//form will get rendered always
// the bigger scope- captures the whole bottom part- the form AND the individual orders that will show up once the orders are created
//
import Backbone from 'backbone';
// import _ from 'underscore';
import QuoteView from '../views/quote_view';
import Quote from '../models/quote';
import TradeHistoryView from '../views/trade_history_view';
import OrderView from '../views/order_view';

const OrderListView = Backbone.View.extend({
  initialize(params){
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'update', this.render);
    this.listenTo(this.bus, 'quote_price_change', this.buySellQuote);
  },
  render() {
    this.$('#orders').empty();

    this.model.each((order) => {
      const orderView = new OrderView({
        model: order,
        template: this.template,
        tagName: 'li',
        className: 'order', // orders?
        bus: this.bus,
      });
      this.$('#orders').append(orderView.render().$el);
    });
    this.newOrderFormRender();
    return this;
  },
  newOrderFormRender() {
    this.quotes.each((quote) =>{
      const symbol = quote.get('symbol');
      this.$('#add-order form select').append(`<option value="${symbol}">${symbol}</option>`);
    })
  },
  events: {
    'click button.btn-buy, button.btn-sell': 'addOrder',
  },
  addOrder(event) {
    event.preventDefault();
    const formData = this.getFormData();
    const quotePrice = this.quotes.where({symbol: formData['symbol']})[0].get('price');

    if (event.target.classList.contains('btn-buy')) {
      formData['buy'] = true;
      if (quotePrice <= formData['targetPrice']) {
        console.log('targetPrice must be lower than current price');
        return
      }
    }
    else {
      formData['buy'] = false;
      if (quotePrice >= formData['targetPrice']) {
        console.log('targetPrice must be higher than current price ');
        return;
      }
    }
    const newOrder = new Order(formData);
    if (!newOrder.isValid()) {
      newOrder.destroy();
      console.log(newOrder.validationError);
      return;
    }
    this.model.add(newOrder);
    this.clearFormData;
  },
  getFormData() {
    const orderData = {};
    orderData['symbol'] = this.$('#add-order-form select[name="symbol"]').val();
    orderData['targetPrice'] = Number(this.$('#add-order-form input[name="price-target"]').val());
    return orderData;
  },
  clearFormData() {
    this.$('#add-order-form input[name="price-target"]').val('');
  },
  buySellQuote(quote) {
    const selectedOrder = this.model.where({symbol: quote.get('symbol')});

    selectedOrder.forEach((order) => {
      if (order.get('buy')) {
        if (order.get('targetPrice') >= quote.get('price')) {
          this.bus.trigger('order_sale', { buy: true, symbol: order.get('symbol') })
          this.model.remove(order);
        }
      } else {
        if (order.get('targetPrice') <= quote.get('price')) {
          this.bus.trigger('order_sale', { buy: false, symbol: order.get('symbol') })
          this.model.remove(order);
        }
      }
    });
  },

  // sell(event) {
  //   console.log('selling');
  //   this.model.sell();
  //   this.bus.trigger('update', this.model);
  // },
});

export default OrderListView;
