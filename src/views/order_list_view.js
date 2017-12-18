import Backbone from 'backbone';
import Order from '../models/order';
import OrderView from './order_view';
import $ from 'jquery';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.bus = params.bus;
    this.template = params.template;
    this.quotes = params.quotes;
    this.listenTo(this.model, 'update', this.render);
  },
  render() {
   this.$('#orders').empty();

   this.model.each((order) => {
     const orderView = new OrderView({
       model: order,
       template: this.template,
       bus: this.bus,
       tagName: 'li',
       quotes: 'this.quotes',
       className: 'order',
     });
     this.$('#orders').append(orderView.render().$el);
   });
   return this;
  },
  events: {
    'click .btn-buy': 'buyOrder',
    'click .btn-sell': 'sellOrder',
  },
  makeOrder(value) {
    this.$('.form-errors').empty();

    const orderData = {
      bus: this.bus,
      symbol: this.$('select[name=symbol]').val(),
      quote: this.quotes.find({symbol: this.$('select[name=symbol]').val()}),
      buy: value.buy,
      targetPrice: parseFloat(this.$('input[name=price-target]').val())
    };
    return new Order(orderData);
  },
  buyOrder: function(e) {
    e.preventDefault();
    const order = this.makeOrder({buy: true});
    this.validate(order);
  },
  sellOrder: function(e) {
    e.preventDefault();
    const order = this.makeOrder({buy: false});
    this.validate(order);
  },
  validate(order) {
    if (order.isValid()) {
      this.model.add(order);
      this.$el.find('form').trigger('reset');
    } else {
      const errors = order.validationError;
      const errorSection = this.$('.form-errors');

      Object.keys(errors).forEach((field) => {
        errors[field].forEach((error) => {
          const html = `<h3>${error}</h3>`;
          errorSection.append(html);
        });
      });
    }
  },
});


export default OrderListView;
