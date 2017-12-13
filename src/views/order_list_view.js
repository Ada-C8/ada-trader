import Backbone from 'backbone';
import OrderView from './order_view';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
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
    this.model.add(orderData);
    this.$('.order-entry-form [name=price-target]').val("");
  },
})

export default OrderListView
