import Backbone from 'backbone';
import Order from '../models/order';
import OpenOrderView from './open_order_view';

const OpenOrderListView = Backbone.View.extend({
  initialize(params) { // params is a hash -- only a hash because we passed it in as such
    this.template = params.template;

    this.listenTo(this.model, 'update', this.render);
  },
  // events: {
  //
  // },
  render() {
    this.$('#orders').empty();

    this.model.each((order) => {
      const openOrderView = new OpenOrderView({
        model: order,
        template: this.template,
        tagName: 'li',
        className: 'order',
      });

      this.$('#orders').append(openOrderView.render().$el);
    });
    return this;
  }
});

export default OpenOrderListView;
