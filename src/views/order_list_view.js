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
    const targetPrice = this.$('input').val();
    const buy = buying;
    const desiredQuote = this.quotes.findWhere({
        symbol: selectedQuote
    });
    // console.log('The Form Quote is:');
    // console.log(selectedQuote);
    // console.log('The Form Price is: ');
    // console.log(targetPrice);
    // console.log('is this a buy order?');
    // console.log(buy);
    // console.log('the desired Quote is');
    // console.log(desiredQuote);
    const newOrder = new Order({
      targetPrice: targetPrice,
      symbol: selectedQuote,
      buy: buy,
      quote: desiredQuote,
    });

    // console.log('the data for the newOrder is:')
    // console.log(newOrder);
    // console.log('the quote attached to ')
    // console.log(newOrder.quote);
  },
  buyOrder(event) {
    // this.model.add(order);
    event.preventDefault();
    console.log('buying this order');
    console.log(event);
    this.createOrderFromForm(event, true);
  },
  sellOrder(event) {
    event.preventDefault();
    console.log('selling this order');
    console.log(event);
    this.createOrderFromForm(event, false);
  },
});

export default OrderListView;
