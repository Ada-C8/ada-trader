
import Backbone from 'backbone';
import Order from '../models/order';
import OpenOrderView from './open_order_view';
import Quote from '../models/quote';
import QuoteView from '../views/quote_view';
import QuoteList from '../collections/quote_list';
import $ from 'jquery';

const OpenOrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.model = params.model;

    this.listenTo(this.model, 'update', this.render);
  },
  render() {
    console.log('you are in the open order list view');
    this.$('#orders').empty();
    console.log('in the render in open order list view');
    console.log(this.model);

    this.model.each((order) => {
      const openOrderView = new OpenOrderView({
        model: order,
        template: this.template,
        tagName: 'li',
        className: 'orders',
      });

      this.$('#orders').append(openOrderView.render().$el);
    });
    return this;
  }
});

export default OpenOrderListView;
