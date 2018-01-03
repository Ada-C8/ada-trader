import Backbone from 'backbone';
import OrderView from './order_view';
import Order from '../models/order';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.quotes = params.quoteList;

    this.listenTo(this.model, 'update', this.render);
    this.listenTo(this.bus, 'quote_change', this.buyOrSellOrder);

    this.displayOrderForm();
  },

  render() {
    this.$('#orders').empty();

    this.model.forEach((order) => {
        const orderView = new OrderView({
          model: order,
          template: this.template,
          tagName: 'li',
          className: 'order',
          bus: this.bus,
        });
      this.$('#orders').append(orderView.render().$el);
    });

    return this;
  },

  events: {
    'click button.btn-buy': 'buyOrder',
    'click button.btn-sell': 'sellOrder',
  },

  displayOrderForm() {
    this.quotes.each((quote) => {
      const symbol = quote.get('symbol');
      this.$('.order-entry-form select').append(`<option value="${symbol}">${symbol}</option>`);
    });
  },

  getFormData(action) {
    const orderData = {};

    orderData['symbol'] = this.$('.order-entry-form select[name="symbol"] option:selected').val();
    orderData['quote'] = this.quotes.findWhere({symbol: orderData['symbol']});
    orderData['targetPrice'] = Number(this.$('.order-entry-form input[name="price-target"]').val());
    orderData['buy'] = action;

    return orderData;
  },

  clearFormData() {
    this.$('.order-entry-form input[name="price-target"]').val('');
  },

  buyOrder(event) {
    this.addOrder(event, 'buy');
  },

  sellOrder(event) {
    this.addOrder(event, 'sell');
  },

  addOrder(event, action) {
    event.preventDefault();

    const formData = this.getFormData(action);

    const newOrder = new Order(formData);
    this.model.add(newOrder);
    this.clearFormData();
  },

  buyOrSellOrder(quote) {
    let currentOrders = this.model.where({symbol: quote.get('symbol')});
    currentOrders.forEach((order) => {

      if (order.get('buy') == 'buy' && order.get('targetPrice') >= quote.get('price'))  {
        let tradeItem = {
          price: order.get('targetPrice'),
          symbol: order.get('symbol'),
          buy: 'bought',
        }
        this.bus.trigger('boughtOrSold', tradeItem);
        order.destroy();
        quote.buy();
      }

      else if (order.get('buy') == 'sell' && order.get('targetPrice') <= quote.get('price')) {
        let tradeItem = {
          price: order.get('targetPrice'),
          symbol: order.get('symbol'),
          buy: 'sold',
        }
        this.bus.trigger('boughtOrSold', tradeItem)
        order.destroy();
        quote.sell();
      }
    });
  }
});

export default OrderListView;
