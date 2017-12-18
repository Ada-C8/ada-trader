import Backbone from 'backbone';
import _ from 'underscore';
import Order from '../models/order';
import OrderView from '../views/order_view';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.quoteList = params.quoteList;
    console.log('ORDERLIST VIEW FOR QUOTES');
    console.log(this.quoteList);
    this.listenTo(this.model, 'update', this.render);
  },
  render() {
    // Clear the unordered list
    this.$('#orders').empty();
    // Iterate through the list rendering each order
    this.model.forEach((order) => {
      // Create a new OrderView with the model & template
      const orderView = new OrderView({
        model: order,
        template: this.template,
        tagName: 'li',
        className: 'order',
      });
      // Then render the OrderView and append the resulting HTML to the DOM.
      this.$('#orders').append(orderView.render().$el);
    });
    return this;
  },
  events: {
    'click button.btn-buy': 'buyOrder',
    'click button.btn-sell': 'sellOrder',
  },
  buyOrder: function(event) {
    console.log('AddOrder Button Clicked');
    event.preventDefault();

    const orderData = {
      buy: true,
      symbol: this.$('select[name=symbol]').val(),
      targetPrice: parseFloat(this.$('input[name=price-target]').val()),
      matchedQuote: this.quoteList.findWhere({ symbol: this.$('select[name=symbol]').val() }),
    };

    const newOrder= new Order(orderData);
    console.log('INSIDE BUYORDER FUNCTION');

    // console.log(newOrder.matchedQuote);
    if (newOrder.isValid()) {
      this.model.add(newOrder);
      newOrder.listenTo(newOrder.get('matchedQuote'), 'change', newOrder.priceCheck);
    } else {
      console.log(newOrder);
      this.updateStatusMessageFrom(newOrder.validationError);
    }
  },
  sellOrder: function(event) {
    console.log('AddOrder Button Clicked');
    event.preventDefault();

    const orderData = {
      buy: false,
      symbol: this.$('select[name=symbol]').val(),
      targetPrice: parseFloat(this.$('input[name=price-target]').val()),
      matchedQuote: this.quoteList.findWhere({ symbol: this.$('select[name=symbol]').val() }),
    };

    const newOrder= new Order(orderData);
    console.log(newOrder);
    if (newOrder.isValid()) {
      this.model.add(newOrder);
      newOrder.listenTo(newOrder.get('matchedQuote'), 'change', newOrder.priceCheck);
    } else {
      this.updateStatusMessageFrom(newOrder.validationError);
    }
  },
  updateStatusMessageFrom: function(messageHash) {
    const statusMessagesEl = this.$('.form-errors');
    statusMessagesEl.empty();
    _.each(messageHash, (messageType) => {
      messageType.forEach((message) => {
        statusMessagesEl.append(`<h3>${message}</h3>`);
      })
    });
  },
});

export default OrderListView;
