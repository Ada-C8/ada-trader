import Backbone from 'backbone';
import _ from 'underscore';
import OrderView from '../views/order_view';
import Order from '../models/order';
import QuoteList from '../collections/quote_list';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.quoteList = params.quoteList;
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
    'click button.btn-buy': 'openBuyOrder',
    'click button.btn-sell': 'openSellOrder',
  },
  openBuyOrder: function(event) {
    event.preventDefault();
    const orderData = {
      symbol: this.$(`select[name=symbol]`).val(),
      targetPrice: parseFloat(this.$('input[name=price-target]').val()),
      buy: true,
      matchedQuote: this.quoteList.findWhere({ symbol: this.$('select[name=symbol]').val() }),
    };
    const newOrder = new Order(orderData);
    if (newOrder.isValid()) {
      this.model.add(newOrder);
      newOrder.listenTo(newOrder.get('matchedQuote'), 'change', newOrder.comparePrice);
    } else {
      this.updateStatusMessageFrom(newOrder.validationError);
    }
    console.log(newOrder);
  },
  openSellOrder: function(event) {
    event.preventDefault();
    // console.log(this.quoteList);
    const orderData = {
      symbol: this.$(`select[name=symbol]`).val(),
      targetPrice: parseFloat(this.$('input[name=price-target]').val()),
      buy: false,
      matchedQuote: this.quoteList.findWhere({ symbol: this.$('select[name=symbol]').val() }),
    };

    const newOrder = new Order(orderData);
      if (newOrder.isValid()) {
        this.model.add(newOrder);
        newOrder.listenTo(newOrder.get('matchedQuote'), 'change', newOrder.comparePrice);
      } else {
        this.updateStatusMessageFrom(newOrder.validationError);
      }
  },
  updateStatusMessageFrom: function(messageHash) {
    const errorMessageEl = this.$('.form-errors');
    errorMessageEl.empty();
    _.each(messageHash, (messageType) => {
      messageType.forEach((message) => {
        errorMessageEl.append(`<h3>${message}</h3>`);
      });
    });
  },

});

export default OrderListView;
