import Backbone from 'backbone';
import OrderView from './order_view';
import Order from '../models/order';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.quotes = params.quotes //this might be a bad idea

    this.listenTo(this.model, 'update', this.render);
    this.listenTo(this.bus, 'quote_change_price', this.buySellQuote);
  },

  render() {
    this.$('#orders').empty();

    this.model.each((order) => {
      const orderView = new OrderView({
        model: order,
        bus: this.bus,
        template: this.template,
        tagName: 'li',
        className: 'order',
      });
      this.$('#orders').append(orderView.render().$el);
    });

    this.newOrderFormRender();

    return this;
  },

  newOrderFormRender() {
    this.$('#add-order-form select').html('')
    this.quotes.each((quote) => {
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
    formData['buy'] = event.target.classList.contains('btn-buy') ? true : false;

    const quotePrice = this.quotes.where({symbol: formData['symbol']})[0].get('price');
    const invalidBuy = formData['buy'] && (quotePrice <= formData['targetPrice'])
    const invalidSell = !formData['buy'] && (quotePrice >= formData['targetPrice'])

    if (invalidBuy || invalidSell) {
      this.updateStatusMessage(`to set a ${invalidBuy ? 'buy' : 'sell'} order, targetPrice must be ${invalidBuy ? 'lower' : 'higher'} than current price`); //is this the right place to be doing this validation?
      return
    }

    const newOrder = new Order(formData);

    if (!newOrder.isValid()) {
      newOrder.destroy();
      this.updateStatusMessage(newOrder.validationError);
      return;
    }

    this.model.add(newOrder);
    this.clearFormData();
    this.updateStatusMessage(`New order for ${newOrder.get('symbol')} set!`)
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


  updateStatusMessage(message) {
    const $statusMessages = this.$('.form-errors');
    $statusMessages.empty();
    $statusMessages.append(`<p>${message}</p>`);
  },

  buySellQuote(quote) {
    const relevantOrders = this.model.where({symbol: quote.get('symbol')});

    relevantOrders.forEach((order) => {
      const buy = order.get('buy') && (order.get('targetPrice') >= quote.get('price'))
      const sell = !order.get('buy') && (order.get('targetPrice') <= quote.get('price'))

      if ( buy || sell ) {
        this.bus.trigger('order_sale', {
          buy: buy,
          symbol: order.get('symbol')
        });
        this.model.remove(order);
      }
    });
  },

});

export default OrderListView;
