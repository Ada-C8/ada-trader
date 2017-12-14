//form will get rendered always
// the bigger scope- captures the whole bottom part- the form AND the individual orders that will show up once the orders are created
//
import Backbone from 'backbone';
// import _ from 'underscore';
import QuoteView from '../views/quote_view';
import Quote from '../models/quote';
import TradeHistoryView from '../views/trade_history_view';
import OrderView from '../views/order_view';
import Order from '../models/order';

const OrderListView = Backbone.View.extend({
  initialize(params){
    this.template = params.template;
    this.bus = params.bus;
    this.quotes = params.quotes;

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
      this.$('#orders').prepend(orderView.render().$el);
    });
    this.newOrderFormRender();
    return this;
  },
  newOrderFormRender() {
    this.$('#add-order-form select').html('');
    this.quotes.each((quote) =>{
      const symbol = quote.get('symbol');
      this.$('#add-order-form select').append(`<option value="${symbol}">${symbol}</option>`);
    });
  },
  events: {
    'click button.btn-buy, button.btn-sell': 'addOrder',
  },
  addOrder(event) {
    event.preventDefault();
    const formData = this.getFormData();
    console.log(formData);
    const quotePrice = this.quotes.where({symbol: formData['symbol']})[0].get('price');
    if (event.target.classList.contains('btn-buy')) {
      formData['buy'] = true;
      if (quotePrice <= formData['targetPrice']) {
        // console.log('targetPrice must be lower than current price');
        this.updateUser('Sorry! You must enter a number that is lower than the current price ');
        return
      }
    }
    else {
      formData['buy'] = false;
      if (quotePrice >= formData['targetPrice']) {
        // console.log('targetPrice must be higher than current price ');
        this.updateUser('Sorry! You must enter a number that is  higher than the current price ');
        return;
      }
    }
    const newOrder = new Order(formData);
    console.log(formData);
    // seriously need to do some status messaging...
    if (!newOrder.isValid()) {
      newOrder.destroy();
      this.updateUser(newOrder.validationError);
      return;
    }
    this.model.add(newOrder);
    this.clearFormData();
    this.updateUser(`Created new order for:  ${newOrder.get('symbol')} `)
  },
  getFormData() {
    const orderData = {};
    orderData['symbol'] = this.$('#add-order-form select[name="symbol"]').val();
    orderData['targetPrice'] = Number(this.$('#add-order-form input[name="price-target"]').val());
    console.log(orderData);
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
  updateUser(message) {
    const $messages = this.$('.form-errors');
    $messages.empty();
    $messages.append(`<p>${message}</p>`);
  },
  // sell(event) {
  //   console.log('selling');
  //   this.model.sell();
  //   this.bus.trigger('update', this.model);
  // },
});

export default OrderListView;
