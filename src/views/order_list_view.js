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
    const currentOpenOrders = this.$('#orders-list-container');
    currentOpenOrders.empty();
    this.model.each((order) => {
      const orderView = new OrderView({
        model: order,
        template: this.template,
        bus: this.bus,
        tagName: 'li',
        className: `order ${order.get('classStatus')}`,
      });
      this.$('#orders-list-container').prepend(orderView.render().$el);
    });
    return this;
  },
  createOrderFromForm(event, buying) {
    const selectedQuote = this.$('select option:selected').text();
    const targetPrice = parseFloat(this.$('input').val());
    const desiredQuote = this.quotes.findWhere({
        symbol: selectedQuote
    });

    const newOrder = new Order({
      targetPrice: targetPrice,
      symbol: selectedQuote,
      buy: buying,
      quote: desiredQuote,
      bus: this.bus,
    });
    // console.log(newOrder);
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
});

export default OrderListView;
