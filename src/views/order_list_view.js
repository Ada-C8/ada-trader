import Backbone from 'backbone';
import _ from 'underscore';
import OrderView from 'views/order_view';
import Order from 'models/order';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.quotes = params.quotes;
    this.listenTo(this.model,'update', this.render);
  },
  events: {
    'click button.btn-buy': 'buyOrder',
    'click button.btn-sell': 'sellOrder',
  },
  render() {
    const currentOpenOrders = this.$('.orders-list-container');
    currentOpenOrders.empty();
    this.model.each((order) => {
      const orderView = new OrderView({
        model: order,
        template: this.template,
        bus: this.bus,
        tagName: 'li',
        className: `order ${order.get('classStatus')}`,
      });
      this.$('.orders-list-container').prepend(orderView.render().$el);
    });
    return this;
  },
  createOrderFromForm(event, buying) {
    const selectedSymbol = this.$('select option:selected').text();
    const targetPrice = parseFloat(this.$('input').val());
    const desiredQuote = this.quotes.findWhere({
        symbol: selectedSymbol
    });

    const newOrder = new Order({
      targetPrice: targetPrice,
      symbol: selectedSymbol,
      buy: buying,
      quote: desiredQuote,
      bus: this.bus,
    });
    // console.log(newOrder);
    this.validateOrder(newOrder);
  },
  buyOrder(event) {
    // this.model.add(order);
    event.preventDefault();
    // console.log('buying this order');
    // console.log(event);
    this.createOrderFromForm(event, true);
  },
  sellOrder(event) {
    event.preventDefault();
    // console.log('selling this order');
    // console.log(event);
    this.createOrderFromForm(event, false);
  },
  validateOrder(order) {
    this.$('.form-errors').empty();
    // console.log(' in the validate order method');
    if (order.isValid()) {
      // console.log('the new order is valid');
      this.model.add(order);
      // clear form after an order is made
      this.$el.find('form').trigger('reset');
    } else {
      order.destroy();
      const errors = order.validationError;
      // console.log('the new order is invalid');
      const errorSection = this.$('.form-errors');
      Object.keys(errors).forEach((errorType) => {
        errors[errorType].forEach((error) => {
          const html = `<p class="error-msg">${errorType}: ${error}</p>`;
          errorSection.append(html);
        });
      });
    }
  },
});

export default OrderListView;
