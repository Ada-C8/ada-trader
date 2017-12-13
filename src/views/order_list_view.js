import Backbone from 'backbone';
import OrderView from './order_view';
import Order from '../models/order';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'update', this.render);
    this.quoteListView = params.quoteListView;
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
      orderView.listenTo(this.quoteListView, 'priceChange', orderView.executeOrder);
    });
    return this;
  },
  events: {
    'click .btn-buy': 'addOrder',
    'click .btn-sell': 'addOrder'
  },
  addOrder: function(event) {
    event.preventDefault();
    // validate? when you create a new order?
    const orderData = this.$(event.target).attr('class').includes('btn-buy') ? { buy: true } : {buy: false}
    orderData['symbol'] = this.$('select :selected').text();
    const stringTargetPrice = this.$(`input[name=price-target]`).val();
    orderData['targetPrice'] = parseFloat(stringTargetPrice);
    const newOrder = new Order(orderData);
    if (newOrder.isValid()) {
      this.model.add(newOrder);
      this.$('.order-entry-form [name=price-target]').val("");
      this.$('.form-errors').empty();
    } else {
      this.$('.form-errors').empty();
      for(let key in newOrder.validationError) {
        newOrder.validationError[key].forEach((error) => {
          this.$('.form-errors').append(`<p>${key}: ${error}</p>`);
        })
      }
    }
  },
})

export default OrderListView
