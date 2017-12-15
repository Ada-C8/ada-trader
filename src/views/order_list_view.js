import Backbone from 'backbone';
import Quote from '../models/quote';
// import QuoteView from '../views/quote_view';
import Order from '../models/order';
import OrderView from '../views/order_view'
import QuoteList from '../collections/quote_list';
import $ from 'jquery';



const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.model = params.model;
    this.listenTo(this.model, 'update', this.render);
  },

  render() {
    this.$el.empty();
    this.model.each((order) => {
      const orderView = new OrderView({
        model: order,
        template: this.template,
        tagname: 'li',
        className: 'orders'
      });
    this.$el.append(orderView.render().$el);
    });
    return this;
  },
});

export default OrderListView;
