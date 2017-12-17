import _ from 'underscore';
import $ from 'jquery';

import Backbone from 'backbone';

import OrderView from '../views/order_view';
import Order from '../models/order'

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
    'click button.btn-buy': 'buyOrder',
    'click button.btn-sell': 'sellOrder'
  },

  buyOrder: function(event) {
    event.preventDefault();
  
    };


  }


  });

  export default OrderListView;
