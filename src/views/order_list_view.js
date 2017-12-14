import $ from 'jquery';
import Backbone from 'backbone';
import Order from 'models/order';
import OrderView from './order_view';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;

    this.quotes = params.symbols;
    this.orderEntryForm(params.symbols.models);

    this.listenTo(this.model, 'update', this.render);
  },
  render() {
    this.$('#orders').empty();
    this.model.each((order) => {
      const orderView = new OrderView({
        model: order,
        template: this.template,
        tagName: 'li',
        className: 'order',
      });
      this.$('#orders').append(orderView.render().$el);
    });
    return this;
  },
  orderEntryForm(quotes) {
    quotes.forEach((symbol) => {
      const value = symbol.get('symbol');
      $('select').append(`<option value="${value}">${value}</option>`);
    });
  },
  events: {
    'click button.btn-buy': 'addOrder',
    'click button.btn-sell': 'addOrder',
  },
  addOrder: function(event) {
    event.preventDefault();
    $('.form-errors').empty();
    const buy = (event.target.classList[0] === 'btn-buy');
    const symbol = this.$(`[name=symbol]`).val();
    const price = parseFloat(this.$(`[name=price-target]`).val());
    const quote = this.quotes.findWhere({symbol: symbol});
    const orderData = {buy: buy, targetPrice: price, symbol: symbol, quote: quote};
    const newOrder = new Order(orderData);
    if (newOrder.isValid()) {
      this.model.add(newOrder);
      console.log(newOrder);
    } else {
      console.log('delete');
      newOrder.destroy();
      this.errorMessage(newOrder.validationError);
    }
  },
  errorMessage(errors) {
    Object.entries(errors).forEach((error)=> {
      $('.form-errors').append(`<h3>${error[1]}</h3>`);
    })
  },
});

export default OrderListView;
